import { EditProfileForm } from "../form/EditProfileForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export default function EditProfileDialog({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifica informazioni del profilo</DialogTitle>
          <DialogDescription>Modifica le informazioni del tuo profilo. Clicca salva quando hai finito.</DialogDescription>
        </DialogHeader>
          <EditProfileForm />
        <DialogFooter className="gap-y-2">
          <Button type="button" variant="outline" onClick={() => {
            setIsOpen(false);
          }}>Annulla</Button>
          <Button type="submit">Salva modifiche</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
