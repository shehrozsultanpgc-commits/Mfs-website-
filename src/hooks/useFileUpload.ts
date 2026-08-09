import { useState } from 'react';
import {
  uploadRequirementFile,
  uploadDeliverableFile,
  StorageUploadResult,
  STORAGE_BUCKETS,
} from '../lib/storageService';

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadedResult, setUploadedResult] = useState<StorageUploadResult | null>(null);

  const reset = () => {
    setIsUploading(false);
    setProgress(0);
    setError(null);
    setUploadedResult(null);
  };

  const uploadRequirement = async (
    orderId: string,
    file: File
  ): Promise<StorageUploadResult> => {
    setIsUploading(true);
    setProgress(10);
    setError(null);

    try {
      const result = await uploadRequirementFile(orderId, file, (p) => setProgress(p));
      if (!result.success && result.error) {
        setError(result.error);
      } else {
        setUploadedResult(result);
      }
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected file upload error occurred.';
      setError(errorMessage);
      const fallbackResult: StorageUploadResult = {
        success: false,
        fileUrl: '',
        filePath: '',
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        error: errorMessage,
      };
      return fallbackResult;
    } finally {
      setIsUploading(false);
    }
  };

  const uploadDeliverable = async (
    orderId: string,
    file: File,
    version = 1
  ): Promise<StorageUploadResult> => {
    setIsUploading(true);
    setProgress(10);
    setError(null);

    try {
      const result = await uploadDeliverableFile(orderId, file, version, (p) => setProgress(p));
      if (!result.success && result.error) {
        setError(result.error);
      } else {
        setUploadedResult(result);
      }
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected deliverable upload error occurred.';
      setError(errorMessage);
      const fallbackResult: StorageUploadResult = {
        success: false,
        fileUrl: '',
        filePath: '',
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        error: errorMessage,
      };
      return fallbackResult;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    isUploading,
    progress,
    error,
    uploadedResult,
    uploadRequirement,
    uploadDeliverable,
    reset,
  };
}
