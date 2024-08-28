export interface ImageFileUploadProps {
  file: File | null;
  filename: string | null;
}

export const initImageFileUploadProps = (): ImageFileUploadProps => {
  return {
    file: null,
    filename: null,
  };
};

export const formatFilename = (url: string, file: File): string => {
  return url.split("/").pop() + file.type.replace("image/", ".");
};
