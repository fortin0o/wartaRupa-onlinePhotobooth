import { describe, it, expect } from 'vitest';
import { getSupportedRecordingMimeType } from '../utils/videoExport';

describe('getSupportedRecordingMimeType', () => {
  it('mengembalikan null saat MediaRecorder tidak tersedia (mis. lingkungan tanpa browser)', () => {
    // Lingkungan test Node tidak punya MediaRecorder — ini menjadi kasus
    // batas yang wajib ditangani dengan baik (CameraScreen menonaktifkan
    // perekaman klip secara halus, bukan crash) tanpa perlu browser sungguhan.
    expect(getSupportedRecordingMimeType()).toBeNull();
  });
});
