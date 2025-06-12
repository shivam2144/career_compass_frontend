import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { fetchAllApplicants } from '../components/admin/Applicants';  // 👈 import the function

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = ({ jobId }) => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                // ✅ Re-fetch applicants to update table
                fetchAllApplicants(dispatch, jobId)();
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error updating status');
        }
    };

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>FullName</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.length > 0 ? (
                            applicants.applications.map((item) => (
                                <tr key={item._id}>
                                    <TableCell>{item?.applicant?.fullname || 'N/A'}</TableCell>
                                    <TableCell>{item?.applicant?.email || 'N/A'}</TableCell>
                                    <TableCell>{item?.applicant?.phoneNumber || 'N/A'}</TableCell>
                                    <TableCell>
                                        {
                                            item.applicant?.profile?.resume
                                                ? <a
                                                    className="text-blue-600 cursor-pointer"
                                                    href={item?.applicant?.profile?.resume}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {item?.applicant?.profile?.resumeOriginalName}
                                                </a>
                                                : <span>NA</span>
                                        }
                                    </TableCell>
                                    <TableCell>{item?.createdAt ? item.createdAt.split("T")[0] : "N/A"}</TableCell>
                                    <TableCell className="float-right cursor-pointer">
                                        <Popover>
                                            <PopoverTrigger>
                                                <MoreHorizontal />
                                            </PopoverTrigger>
                                            <PopoverContent className="w-32">
                                                {
                                                    shortlistingStatus.map((status, index) => (
                                                        <div
                                                            onClick={() => statusHandler(status, item?._id)}
                                                            key={index}
                                                            className='flex w-fit items-center my-2 cursor-pointer'
                                                        >
                                                            <span>{status}</span>
                                                        </div>
                                                    ))
                                                }
                                            </PopoverContent>
                                        </Popover>
                                    </TableCell>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <TableCell colSpan={6} className="text-center">No applicants yet.</TableCell>
                            </tr>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable;
