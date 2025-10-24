import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Trash2, Download, Upload, X } from "lucide-react";
import { MobileNav } from "@/components/MobileNav";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getNotes, saveNote, deleteNote, processFile, UploadedNote } from "@/lib/notesStorage";

const Notes = () => {
  const [notes, setNotes] = useState<UploadedNote[]>(getNotes());
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const file = files[0];
      
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'application/vnd.ms-powerpoint'
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload PDF, Word, Excel, or PowerPoint files only");
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size must be less than 10MB");
        return;
      }

      const note = await processFile(file);
      saveNote(note);
      setNotes(getNotes());
      toast.success(`${file.name} uploaded successfully!`);
      setIsUploadOpen(false);
    } catch (error) {
      toast.error("Failed to upload file");
      console.error(error);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = (id: string) => {
    deleteNote(id);
    setNotes(getNotes());
    toast.success("Note deleted");
  };

  const handleDownload = (note: UploadedNote) => {
    if (!note.dataUrl) return;
    
    const link = document.createElement('a');
    link.href = note.dataUrl;
    link.download = note.fileName;
    link.click();
    toast.success("Download started");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('sheet') || fileType.includes('excel')) return '📊';
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) return '📽️';
    return '📎';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="flex w-full">
        <DesktopSidebar />
        
        <main className="flex-1 md:ml-64 pb-20 md:pb-8">
          <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h1 className="font-heading font-bold text-4xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Notes & Documents
                </h1>
                <p className="text-muted-foreground">
                  Upload and manage your study materials
                </p>
              </div>
              <Button 
                className="gradient-hero text-white shadow-lg hover:shadow-xl transition-all"
                onClick={() => setIsUploadOpen(true)}
              >
                <Upload className="mr-2 w-4 h-4" />
                Upload Note
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <div className="text-2xl font-bold text-primary">{notes.length}</div>
                <div className="text-sm text-muted-foreground">Total Notes</div>
              </Card>
              <Card className="p-4 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
                <div className="text-2xl font-bold text-success">
                  {formatFileSize(notes.reduce((acc, note) => acc + note.fileSize, 0))}
                </div>
                <div className="text-sm text-muted-foreground">Total Size</div>
              </Card>
            </div>

            {/* Notes Grid */}
            <div className="space-y-4">
              <h2 className="font-heading font-semibold text-xl">My Uploaded Notes</h2>
              
              {notes.length === 0 ? (
                <Card className="p-12 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                  <h3 className="font-semibold text-lg mb-2">No notes uploaded yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload PDF, Word, Excel, or PowerPoint files to get started
                  </p>
                  <Button onClick={() => setIsUploadOpen(true)} className="gradient-hero text-white">
                    <Upload className="mr-2 w-4 h-4" />
                    Upload Your First Note
                  </Button>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {notes.map((note) => (
                    <Card key={note.id} className="p-6 hover:shadow-lg transition-all duration-300 group">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-4xl">{getFileIcon(note.fileType)}</div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDownload(note)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity text-destructive"
                            onClick={() => handleDelete(note.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-1 truncate">{note.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{note.fileName}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{formatFileSize(note.fileSize)}</span>
                        <span>{new Date(note.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Upload Dialog */}
      <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Note</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
              <Upload className="w-12 h-12 mx-auto mb-4 text-primary" />
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop or click to upload<br />
                PDF, Word, Excel, or PowerPoint (Max 10MB)
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="gradient-hero text-white"
              >
                {uploading ? "Uploading..." : "Select File"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <MobileNav />
    </div>
  );
};

export default Notes;
