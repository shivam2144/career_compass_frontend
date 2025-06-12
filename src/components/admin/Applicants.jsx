import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

// ✅ Move this function outside so that we can import/use it elsewhere
export const fetchAllApplicants = (dispatch, jobId) => async () => {
    try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/${jobId}/applicants`, { withCredentials: true });
        dispatch(setAllApplicants(res.data.job));
    } catch (error) {
        console.log(error);
    }
};

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        fetchAllApplicants(dispatch, params.id)();
    }, [dispatch, params.id]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto'>
                <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length || 0})</h1>
                <ApplicantsTable jobId={params.id} />
            </div>
        </div>
    )
}

export default Applicants;
