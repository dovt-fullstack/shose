import { useGetCommentQuery, useRemoveCommentMutation } from '@/api/comments'
import TitlePage from '@/components/TitlePage/TitlePage'

import { Button, Pagination, Popconfirm, notification } from 'antd'
import { AiTwotoneDelete } from 'react-icons/ai'

export default function Comment() {
  const { data: commentData, refetch } = useGetCommentQuery()
  const [removeComment] = useRemoveCommentMutation()
  const handleSoftDelete = async (id: string) => {
    try {
      await removeComment(id)
      notification.success({
        message: 'Success',
        description: 'Xóa bình luận thành công'
      })
      refetch()
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Xóa bình luận không thành công'
      })
    }
  }
  return (
    <div>
      <header className='flex items-center justify-between mb-4'>
        <TitlePage title='Quản lý Bình luận' />
      </header>

      <table className='min-w-full divide-y divide-gray-200 bg-white text-sm w-max '>
        <thead className='ltr:text-left rtl:text-right '>
          <tr className='bg-gray-50'>
            <th className='whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5'>
              <div className='flex items-center'>
                <div className='mr-2'> Người dùng </div>
              </div>
            </th>
            <th className='whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5'>
              <div className='flex items-center'>
                <div className='mr-2'>Id sản phẩm </div>
              </div>
            </th>
            <th className='whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5'>
              <div className='flex items-center'>
                <div className='mr-2'>Nội dung</div>
              </div>
            </th>
            <th className='whitespace-nowrap py-4 font-medium text-gray-900 text-left px-5'>
              <div className='flex items-center'>
                <div className='mr-2'>Action </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200 '>
          {commentData?.length ? (
            commentData.map((comment, index) => (
              <tr key={index}>
                <td className='whitespace-nowrap font-medium text-gray-900 flex text-left my-5 mx-2 '>
                  <div className='flex items-center'>
                    <p className='text-xs lg:text-base md:text-xl  mx-1'> {comment.fullname}</p>
                  </div>
                </td>
                <td className='whitespace-nowrap  text-gray-700 py-4 '>
                  <div className='items-center'>
                    <p className='text-xs lg:text-base md:text-xl mx-1'>{comment.productId}</p>
                  </div>
                </td>
                <td className='whitespace-nowrap  text-gray-700 py-4 '>
                  <div className='items-center'>
                    <p className='text-xs lg:text-base md:text-xl mx-8'>{comment.content}</p>
                  </div>
                </td>
                <td className='whitespace-nowrap '>
                  <div className='flex items-center'>
                    {/* <Link to={`/admin/comments/${comment._id}`} className='px-3 rounded-md'>
                      <Button type='primary' className='bg-blue-600'>
                        <AiTwotoneEdit />
                      </Button>
                    </Link> */}
                    <div className='px-2 py-4 text-xl cursor-pointer'>
                      <Popconfirm
                        placement='topRight'
                        title={`Xóa bình luận "${comment.content}"?`}
                        onConfirm={() => handleSoftDelete(comment._id as string)}
                        okText='Yes'
                        cancelText='No'
                        okButtonProps={{ style: { background: 'red' } }}
                      >
                        <Button type='primary' danger className='bg-red-600'>
                          <AiTwotoneDelete />
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No colors found.</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className='flex justify-center'>
        <Pagination defaultCurrent={1} total={100} />
      </div>
    </div>
  )
}
