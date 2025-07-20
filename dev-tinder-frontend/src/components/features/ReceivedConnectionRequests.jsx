import { useEffect, useState } from "react";
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRequests, reviewRequest } from "../../utils/services/api.service";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../../utils/appstore/requestslice";
import { REVIEW_STATUS_ACCEPTED, REVIEW_STATUS_DECLINED } from "../../utils/constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function ReceivedConnectionRequests() {

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store)=>store.user)

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetchRequests();
            dispatch(addRequests(response.data));
            setRequests(response.data);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
            toast.error("Failed to load connection requests");
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = async (status, requestId) => {
        try {
            setProcessing(true);
            const response = await reviewRequest(status, requestId);
            toast.success(response.message || "Connection accepted successfully!");
            setRequests(prev => prev.filter(req => req._id !== requestId));
        } catch (error) {
            console.error("Failed to accept request:", error);
            toast.error(error.response?.data?.message || "Failed to accept connection");
        } finally {
            setProcessing(false);
        }
    };

    const handleDecline = async (status, requestId) => {
        try {
            setProcessing(true);
            const response = await reviewRequest(status, requestId);
            toast.info(response.message || "Request declined");
            setRequests(prev => prev.filter(req => req._id !== requestId));
        } catch (error) {
            console.error("Failed to decline request:", error);
            toast.error(error.response?.data?.message || "Failed to decline connection");
        } finally {
            setProcessing(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden">
            {/* Toast Container */}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />

            {/* Back Button */}
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-6 left-6 btn btn-circle btn-ghost text-white hover:bg-white/10 z-20"
                onClick={() => navigate(-1)}
            >
                <ArrowLeftIcon className="h-6 w-6" />
            </motion.button>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-fast"></div>
            </div>

            <div className="max-w-3xl mx-auto p-4 pt-20 relative z-10">
                {user && requests.length !== 0 && <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-clip-text text-3xl text-transparent bg-gradient-to-r font-bold from-yellow-300 to-pink-300 mb-10 text-center"
                >
                    Your Connection Requests
                </motion.h1>}

                {requests.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <h2 className="text-2xl font-bold text-yellow-300 mb-2">
                            Currently, No Connection Requests
                        </h2>
                        <p className="text-yellow-200/80">
                            When someone sends you a request, you can view here
                        </p>
                    </motion.div>
                ) : (
                    <AnimatePresence>
                        <div className="space-y-4">
                            {requests.map((request) => (
                                <motion.div
                                    key={request._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                >
                                    <div className="card bg-white/10 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow border border-white/10">
                                        <div className="card-body p-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="avatar">
                                                    <div className="w-16 h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                        <img
                                                            src={request.fromUserId.photoUrl || "https://img.icons8.com/ios/100/user-male-circle.png"}
                                                            alt={request.fromUserId.firstName}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = "https://img.icons8.com/ios/100/user-male-circle.png";
                                                            }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="flex-1">
                                                    <h2 className="card-title text-lg text-white">
                                                        {request.fromUserId.firstName} {request.fromUserId.lastName}
                                                    </h2>
                                                    <p className="text-sm text-white/70">
                                                        Sent on {new Date(request.createdAt).toLocaleDateString()}
                                                    </p>
                                                </div>

                                                <div className="flex space-x-2">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleAccept(REVIEW_STATUS_ACCEPTED, request._id)}
                                                        disabled={processing}
                                                        className={`btn btn-sm btn-primary px-4 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {processing ? 'Processing...' : 'Accept'}
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleDecline(REVIEW_STATUS_DECLINED, request._id)}
                                                        disabled={processing}
                                                        className={`btn btn-sm btn-outline btn-outline-white px-4 ${processing ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                    >
                                                        {processing ? 'Processing...' : 'Decline'}
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </AnimatePresence>
                )}
            </div>
        </div>
    );
}

export default ReceivedConnectionRequests;