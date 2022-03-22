// 文件类型map
export enum FILE_TYPE {
  FILE_TYPE_OF_DIR = 0,
  FILE_TYPE_OF_TXT = 1,
  FILE_TYPE_OF_WORD = 11,
  FILE_TYPE_OF_EXCEL = 12,
  FILE_TYPE_OF_POWERPOINT = 13,
  FILE_TYPE_OF_PDF = 14,
  FILE_TYPE_OF_PIC = 2,
  FILE_TYPE_OF_MUSIC = 3,
  FILE_TYPE_OF_VIDEO = 4,
  FILE_TYPE_OF_ZIP = 5,
  FILE_TYPE_OF_APK = 6,
  FILE_TYPE_OF_OTHER = 9
};

// 根据文件类型获取相应图标
export const fileIcoFilter = (fileType: FILE_TYPE) => {
  if (fileType === FILE_TYPE.FILE_TYPE_OF_TXT) {
    return 'icon-file_txt';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_WORD) {
    return 'icon-file_word_office';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_EXCEL) {
    return 'icon-file_excel_office';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_POWERPOINT) {
    return 'icon-file_ppt_office';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_PDF) {
    return 'icon-file_pdf';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_PIC) {
    return 'icon-file_pic';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_MUSIC) {
    return 'icon-file_music';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_VIDEO) {
    return 'icon-file_video';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_ZIP) {
    return 'icon-file_zip';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_APK) {
    return 'icon-file_unknown';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_OTHER) {
    return 'icon-file_unknown';
  } else {
    return 'icon-file_dir';
  }
}

export const fileTypeFormat = (fileType: FILE_TYPE) => {
  if (fileType === FILE_TYPE.FILE_TYPE_OF_TXT) {
    return 'txt文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_WORD) {
    return 'word文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_EXCEL) {
    return 'excel文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_POWERPOINT) {
    return 'ppt文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_PDF) {
    return 'pdf文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_PIC) {
    return '图片文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_MUSIC) {
    return '音频文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_VIDEO) {
    return '视频文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_ZIP) {
    return 'zip文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_APK) {
    return '未知文件';
  } else if (fileType === FILE_TYPE.FILE_TYPE_OF_OTHER) {
    return '未知文件';
  } else {
    return '文件夹';
  }
}

// 格式化文件大小
export const formatFileSize = (fileSize: number) => {
  if (fileSize || fileSize === 0) {
    if (fileSize > 1024 * 1024) {
      fileSize = fileSize / (1024 * 1024);
      return fileSize.toFixed(2) + 'M';
    } else {
      fileSize = fileSize / 1024;
      return fileSize.toFixed(2) + 'KB';
    }
  } else {
    return '--';
  }
}