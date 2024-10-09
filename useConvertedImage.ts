import { useState } from "react";
import DocumentScanner from "react-native-document-scanner-plugin";

export const useConvertedImage = () => {
  const [scannedReceipt, setScannedReceipt] = useState<string>();
  const [convertedImage, setConvertedImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const deleteReceipt = () => {
    setScannedReceipt(undefined);
    setConvertedImage(undefined);
  };

  const scanDocument = async () => {
    const { scannedImages } = await DocumentScanner.scanDocument({
      maxNumDocuments: 1,
    });

    if (scannedImages && scannedImages.length > 0) {
      setScannedReceipt(scannedImages[0]);
      setConvertedImage(undefined);
    }
  };

  const convertImage = async () => {
    setIsError(false);
    setIsLoading(true);
    try {
      let body = new FormData();
      body.append("file", {
        uri: scannedReceipt,
        name: "photo.jpg",
        filename: "imageName.jpg",
        type: "image/jpg",
      });
      body.append("Content-Type", "image/jpg");

      const response = await fetch(
        "https://doc-server-bi5r.onrender.com/doc-scanner/scan",
        {
          method: "POST",
          body: body,
        }
      );
      const blob = await response.blob();

      const fileReaderInstance = new FileReader();
      fileReaderInstance.readAsDataURL(blob);
      fileReaderInstance.onload = () => {
        const base64 = fileReaderInstance.result;
        setConvertedImage(base64 as string);
      };
    } catch (e: unknown) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    convertImage,
    setScannedReceipt,
    deleteReceipt,
    scanDocument,
    scannedReceipt,
    convertedImage,
    isLoading,
    isError,
  };
};
