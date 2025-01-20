import { useCallback, useEffect, useState } from 'react';

export type GeoLocationState = {
  loading: boolean;
  coordinates: GeolocationCoordinates | null;
  error: Error | null;
  isWatching: boolean;
};

class CustomGeoLocationError extends Error {
  code: number;

  constructor(message: string, code: number) {
    super(message);
    this.name = 'CustomGeoLocationError';
    this.code = code;
  }
}

function useGeoLocation(options?: PositionOptions, watch: boolean = false): GeoLocationState {
  const [geoLocationState, setGeoLocationState] = useState<GeoLocationState>({
    loading: true,
    coordinates: null,
    error: null,
    isWatching: watch,
  });

  const onSuccess = useCallback(
    (position: GeolocationPosition) => {
      setGeoLocationState((prevState) => ({
        ...prevState,
        loading: false,
        coordinates: position.coords,
        error: null,
      }));
    },
    [setGeoLocationState],
  );

  const onError = useCallback(
    (error: GeolocationPositionError) => {
      setGeoLocationState((prevState) => ({
        ...prevState,
        loading: false,
        coordinates: null,
        error: new CustomGeoLocationError(error.message, error.code),
      }));
    },
    [setGeoLocationState],
  );

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoLocationState({
        loading: false,
        coordinates: null,
        error: new CustomGeoLocationError('Geolocation is not supported by this browser.', 0),
        isWatching: false,
      });
      return;
    }

    let watcher: number | null = null;
    if (watch) {
      watcher = navigator.geolocation.watchPosition(onSuccess, onError, options);
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }

    return () => {
      if (watcher !== null) {
        navigator.geolocation.clearWatch(watcher);
      }
    };
  }, [watch, options, onSuccess, onError]);

  return geoLocationState;
}

export { useGeoLocation };
