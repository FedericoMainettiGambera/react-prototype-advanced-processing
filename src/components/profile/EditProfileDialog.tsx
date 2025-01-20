import { EditProfileForm } from "../form/EditProfileForm";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";

export default function EditProfileDialog({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modifica informazioni del profilo</DialogTitle>
          <DialogDescription>Modifica le informazioni del tuo profilo. Clicca salva quando hai finito.</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <EditProfileForm />
        </DialogContent>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
