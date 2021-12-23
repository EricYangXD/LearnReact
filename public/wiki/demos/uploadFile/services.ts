import axios from 'axios';

/**
 * 上传附件
 * @param file: FormData
 * @returns
 * {
 *   "attachmentId": "string",
 *   "attachmentName": "string"
 * }
 */
// TODO 配合本地文件上传mockserver，无需手动修改URL
export const uploadAttachmentService = (file: FormData) =>
  axios('/web/attachment', {
    method: 'POST',
    data: file,
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((res) => res.response);

// export const uploadAttachmentService = (file: FormData) =>
//   axios('http://localhost:8083/web/attachment', {
//     method: 'POST',
//     data: file,
//     headers: { 'Content-Type': 'multipart/form-data' },
//   }).then((res) => res.data);
