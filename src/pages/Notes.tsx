import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Image, Folder } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { toast } from "sonner";

const Notes = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="font-heading font-bold text-3xl">Notes & Flashcards</h1>
                <p className="text-muted-foreground">
                  Create, organize, and study with smart notes
                </p>
              </div>
              <Button 
                className="gradient-hero text-white"
                onClick={() => toast.success("Note creation feature coming soon!")}
              >
                <Plus className="mr-2 w-4 h-4" />
                Create New
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => toast.info("No notes yet. Click 'Create New' to start!")}>
                <FileText className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2">My Notes</h3>
                <p className="text-sm text-muted-foreground mb-4">0 notes created</p>
                <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); toast.info("No notes to view yet"); }}>View All</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => toast.info("Create notes first to generate flashcards!")}>
                <Image className="w-12 h-12 text-success mb-4" />
                <h3 className="font-semibold text-lg mb-2">Flashcards</h3>
                <p className="text-sm text-muted-foreground mb-4">0 decks available</p>
                <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); toast.info("No flashcards to study yet"); }}>Study Now</Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => toast.info("No folders yet. Organize your notes here!")}>
                <Folder className="w-12 h-12 text-warning mb-4" />
                <h3 className="font-semibold text-lg mb-2">Folders</h3>
                <p className="text-sm text-muted-foreground mb-4">0 folders organized</p>
                <Button variant="outline" size="sm" className="w-full" onClick={(e) => { e.stopPropagation(); toast.info("No folders to browse yet"); }}>Browse</Button>
              </Card>
            </div>
          </div>
        </main>
      </div>
      
      <MobileNav />
    </div>
  );
};

export default Notes;
