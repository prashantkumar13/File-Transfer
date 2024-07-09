"use client"
import { atom } from 'recoil';

const FilesPicked  = atom({
  key: 'filesToUpload',
  default: []
})

const UploadPercentages = atom({
  key: 'percentages',
  default: []
})

export { UploadPercentages, FilesPicked } 