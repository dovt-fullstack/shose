import { PlusOutlined } from '@ant-design/icons'
import { Modal, Upload } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload'
import type { UploadFile } from 'antd/es/upload/interface'
import axios from 'axios'
import { useState } from 'react'

const CLOUD_NAME = 'dpsl2xj1j'
const UPLOAD_PRESET = 'react_upload'
const FOLDER_name = 'react_upload'
const cloudinaryAPI = 'https://api.cloudinary.com/v1_1/' + CLOUD_NAME + '/image/upload'
type ImageUploadFile = UploadFile & {
  url?: string
  preview?: string
}
type Props = {
  onImageUpLoad: (imageUrl: string) => void
  onImageRemove: (imageUrl: string) => void
  img?: Array<string>
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
const UpLoand = ({ onImageUpLoad, onImageRemove, img }: Props) => {
  const fileLists: ImageUploadFile[] = (img ? img : []).map((imageUrl, index) => ({
    uid: index.toString(),
    url: imageUrl,
    name: `image-${index}.png` // Tên giả định cho hình ảnh (có thể thay đổi tuỳ ý)
  }))
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [previewTitle, setPreviewTitle] = useState('')
  const [fileList, setFileList] = useState<UploadFile[]>(fileLists)
  const handleRemove = (file: UploadFile) => {
    // Xóa ảnh khỏi danh sách hiển thị và truyền thông báo xóa ảnh ra bên ngoài
    setFileList((prevFileList) => {
      const newList = prevFileList.filter((item) => item.uid !== file.uid)
      onImageRemove(file.url || (file.preview as string)) // Thông báo xóa ảnh ra bên ngoài
      return newList
    })
  }

  const uploadImageToCloudinary = async (file: RcFile): Promise<void> => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', UPLOAD_PRESET)
      formData.append('folder', FOLDER_name)

      const response = await axios.post(cloudinaryAPI, formData)
      const imageUrl = response.data.url

      // Update the fileList with the uploaded image URL
      setFileList((prevFileList) => [...prevFileList, { ...file, url: imageUrl }])
      onImageUpLoad(imageUrl)
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error)
    }
  }
  const handleCancel = () => setPreviewOpen(false)

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1))
  }

  const handleChange: UploadProps['onChange'] = async ({ file, fileList: newFileList }) => {
    // Call the upload function when a new file is added
    if (file.status === 'done') {
      // File is successfully uploaded, add it to the fileList with the returned URL
      setFileList(newFileList)
    } else if (file.status === 'uploading') {
      // File is currently uploading, call the upload function
      await uploadImageToCloudinary(file.originFileObj as RcFile)
    } else if (file.status === 'error') {
      // File upload failed
      console.error('Error uploading file:', file.error)
    } else if (file.status === 'removed') {
      // File is removed, update the fileList
      setFileList(newFileList.filter((item) => item.uid !== file.uid))
    }
  }
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <>
      <Upload
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default UpLoand
