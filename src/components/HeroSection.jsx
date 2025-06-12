import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="relative bg-gradient-to-r from-[#6A38C2] to-[#3A59D1] py-20">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 text-center text-white px-4">
                <div className="flex flex-col gap-5 my-10">
                    <span className="mx-auto px-6 py-3 rounded-full bg-white text-[#F83002] font-medium shadow-lg">
                        No. 1 Job Hunt Website
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight animate-slideInFromLeft">
    Search, Apply & <br />
    Get Your <span className="text-[#F83002]">Dream Jobs</span>
</h1>

                    <p className="text-lg max-w-2xl mx-auto mt-4 opacity-80">
                        Discover the best job opportunities, connect with top companies, and land your dream job with ease.
                    </p>
                    <div className="flex w-full md:w-[60%] max-w-lg mx-auto mt-8 shadow-xl border border-gray-200 rounded-full items-center overflow-hidden">
                        <input
                            type="text"
                            placeholder="Find your dream jobs"
                            onChange={(e) => setQuery(e.target.value)}
                            className="outline-none border-none w-full py-3 px-6 text-black placeholder-gray-400"
                        />
                        <Button
                            onClick={searchJobHandler}
                            className="bg-[#6A38C2] hover:bg-[#5b2b93] transition-all ease-in-out duration-300 text-white px-8 py-3"
                        >
                            <Search className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSection;
