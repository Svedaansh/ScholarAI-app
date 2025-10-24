export interface UploadedNote {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadedAt: string;
  content?: string;
  dataUrl?: string;
}

const NOTES_STORAGE_KEY = 'uploaded_notes';

export const saveNote = (note: UploadedNote): void => {
  const notes = getNotes();
  notes.push(note);
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

export const getNotes = (): UploadedNote[] => {
  const stored = localStorage.getItem(NOTES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const deleteNote = (id: string): void => {
  const notes = getNotes().filter(note => note.id !== id);
  localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
};

export const processFile = async (file: File): Promise<UploadedNote> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const note: UploadedNote = {
        id: `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        title: file.name.replace(/\.[^/.]+$/, ""),
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
        dataUrl
      };
      resolve(note);
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};
