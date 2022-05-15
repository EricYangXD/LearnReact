import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Button, FormInstance, message, Upload } from 'antd';
import { DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { RcFile } from 'antd/lib/upload';
import { UploadFile, UploadFileStatus } from 'antd/lib/upload/interface';
import { uploadAttachmentService } from './services';
import { AttachmentStyled } from './styles';

export enum ResCode {
  Success = 0,
  Failed = 1,
}

interface Attachment extends RcFile {
  title?: string;
  url?: string;
  status?: UploadFileStatus;
  originFileObj: RcFile;
  uid: string;
  attachmentId: string;
  name: string;
  attachmentName: string;
}

interface Props {
  form: FormInstance;
}

function UploadBtn({ form }: Props) {
  const [uploading, setUploading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [uploadFileList, setFileList] = useState<Attachment[]>([]);

  useEffect(() => {
    form.setFieldsValue({ attachment: uploadFileList });
    if (disabled && uploadFileList.length < 10) {
      setDisabled(false);
    } else if (!disabled && uploadFileList.length >= 10) {
      setDisabled(true);
    }
  }, [uploadFileList]);

  const beforeUpload = (file: RcFile, fileList: RcFile[]) => {
    if (fileList.length >= 10) {
      setDisabled(true);
      message.warn('最多添加10个附件', 1);
      return false;
    }
    if (file.size > 20 * 1024 * 1024) {
      message.error('上传的附件过大，请上传小于20M的附件', 1);
      return false;
    }
    if (!file) {
      message.error('未选择文件');
      return false;
    }
    return true;
  };

  const customRequest = (options) => {
    setUploading(true);
    const formData = new FormData();
    const { file } = options;
    formData.append('attachment', file, file.name);
    uploadAttachmentService(formData).then((res) => {
      if (res?.code === ResCode.Success) {
        setUploading(false);
        options.onSuccess(res, file);
        const { attachmentId, attachmentName } = res.data;
        setFileList((prev) => [
          ...prev,
          {
            ...file,
            attachmentId,
            attachmentName,
            name: file.name,
            uid: file.uid,
            originFileObj: file,
          },
        ]);
        message.success('上传成功');
      } else {
        setUploading(false);
        message.error('附件上传失败，请重试');
      }
    });
  };

  const onRemove = (file: UploadFile<any>) => {
    console.log('onRemove', file);
    const { uid } = file;
    setFileList((prev) => _.filter(prev, (file) => file.uid !== uid));
  };

  // const onPreview = (file: UploadFile<any>) => {
  //   console.log('onPreview', file);
  //   const {
  //     response: {
  //       data: { attachmentId },
  //     },
  //   } = file;
  //   goToResearchDetail(attachmentId);
  // };

  // const onDownload = (file: UploadFile<any>) => {
  //   console.log('onDownload', file);
  //   const {
  //     response: {
  //       data: { attachmentId },
  //     },
  //   } = file;
  //   goToResearchDetail(attachmentId);
  // };

  // // 下载文件
  // const downLoadFile = (file) => {
  //   var fileName = file.item.fileName;
  //   var fileUrl = file.item.fileUrl;
  //   getBlob(fileUrl).then((blob) => {
  //     var link = document.createElement('a');
  //     link.href = window.URL.createObjectURL(blob as Blob);
  //     link.download = fileName;
  //     link.click();
  //   });
  // };

  // // 文件下载拿到blob对象
  // const getBlob = (url) => {
  //   return new Promise((resolve) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.open('GET', url, true);
  //     xhr.responseType = 'blob';
  //     xhr.onload = () => {
  //       if (xhr.status === 200) {
  //         resolve(xhr.response);
  //       }
  //     };
  //     xhr.send();
  //   });
  // };

  const onSpanClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  return (
    <AttachmentStyled>
      <Upload
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        // maxCount={10}
        onRemove={onRemove}
        // onDownload={onDownload}
        // onPreview={onPreview}
        fileList={uploadFileList}
        showUploadList={{
          // showDownloadIcon: false,
          showRemoveIcon: true,
          // showPreviewIcon: true,
          // downloadIcon: <DownloadOutlined />,
          removeIcon: <DeleteOutlined />,
        }}
      >
        {disabled ? (
          <>
            <Button
              className="uploadBtn"
              type="primary"
              icon={<i className="dyfont dy-click-upload" />}
              disabled
            >
              上传附件
            </Button>
            <span className="hints" onClick={onSpanClick}>
              最多添加10个附件
            </span>
          </>
        ) : (
          <>
            <Button
              className="uploadBtn"
              type="primary"
              icon={<i className="dyfont dy-click-upload" />}
              loading={uploading}
            >
              上传附件
            </Button>
            <span className="hints" onClick={onSpanClick}>
              最多添加10个附件
            </span>
          </>
        )}
      </Upload>
    </AttachmentStyled>
  );
}

export default UploadBtn;
