import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai'

import { Button, Popconfirm, Spin, notification } from 'antd'
import { Link } from 'react-router-dom'
import { useGetTintucQuery, useRemoveTintucMutation } from '@/api/news'
import ImagePriview from '@/components/ImagePreview/ImagePreview'
import TitlePage from '@/components/TitlePage/TitlePage'

export default function ListNews() {
  const { data: tintucData, error, isLoading } = useGetTintucQuery()
  const [removeTintuc] = useRemoveTintucMutation()
  const handleSoftDelete = async (id: string) => {
    try {
      await removeTintuc(id)
      notification.success({
        message: 'Success',
        description: 'Xóa tin tức thành công'
      })
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Xóa tin tức không thành công'
      })
    }
  }

  return (
    <>
      {isLoading ? (
        <div className='flex items-center justify-center'>
          <Spin />
        </div>
      ) : error ? (
        'Error'
      ) : (
        <div>
          <header className='flex items-center justify-between mb-4'>
            <TitlePage title='Quản lý tin tức' />
            <Link to={'/admin/news/add'} className='border rounded bg-blue-500 font-bold px-4 py-2 text-white lg:w-40 '>
              Thêm Tin Tức
            </Link>
          </header>

          <div className='overflow-x-auto'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='ltr:text-left rtl:text-right'>
                <tr>
                  <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Tiêu đề</th>
                  <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Nội Dung</th>
                  <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>Trạng Thái</th>
                  <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'></th>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200'>
                {tintucData?.length ? (
                  tintucData.map((tintuc, index) => (
                    <tr key={index}>
                      <td className='whitespace-nowrap px-4 py-2'>
                        <div className='flex items-center'>
                          <ImagePriview width={12} listImage={tintuc.image} />
                          <Link to={`detailtintuc/${tintuc._id}`}>
                            <p className='text-xs lg:text-base md:text-xl mx-4'>{tintuc.tieude}</p>
                          </Link>
                        </div>
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                        <p className='text-xs lg:text-base md:text-xl max-w-[300px] truncate'>{tintuc.noidung}</p>
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                        <p className='text-xs lg:text-base md:text-xl mx-10'>{tintuc.trang_thai}</p>
                      </td>
                      <td className='whitespace-nowrap px-4 py-2'>
                        <div className='flex space-x-2'>
                          <Link to={`/admin/news/edit/${tintuc._id}`}>
                            <Button type='primary' className='bg-blue-600'>
                              <AiTwotoneEdit />
                            </Button>
                          </Link>

                          <Popconfirm
                            placement='topRight'
                            title={`Delete the news "${tintuc.tieude}"?`}
                            onConfirm={() => handleSoftDelete(tintuc._id)}
                            okText='Yes'
                            cancelText='No'
                          >
                            <Button type='primary' danger className='bg-red-600' icon={<AiTwotoneDelete />} />
                          </Popconfirm>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4}>No tintuc found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  )
}
