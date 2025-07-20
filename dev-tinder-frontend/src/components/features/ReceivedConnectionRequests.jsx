import { useEffect, useState } from "react";
import { fetchRequests } from "../../utils/services/api.service";
import { useDispatch } from "react-redux";
import { addRequests } from "../../utils/appstore/requestslice";

function ReceivedConnectionRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const sendRequests = async () => {
        try {
            setLoading(true);
            const response = await fetchRequests();
            dispatch(addRequests(response.data));
            setRequests(response.data);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAccept = (requestId) => {
        console.log("Accepting request:", requestId);
    };

    const handleDecline = (requestId) => {
        console.log("Declining request:", requestId);
        // Add your decline logic here
    };

    useEffect(() => {
        sendRequests();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    if (requests.length === 0) {
        return (
            <div className="text-center py-10">
                <div className="text-2xl font-bold text-gray-500 mb-2">Currently,No Connection Requests</div>
                <p className="text-gray-400">When someone sends you a request, it will appear here</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-32 -left-32 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-float-medium"></div>
                <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-float-fast"></div>
            </div>

            <div className="max-w-3xl mx-auto p-4">
                <h1 className="bg-clip-text text-3xl text-transparent bg-gradient-to-r font-bold from-yellow-300 to-pink-300 ml-60 my-10">Connection Requests</h1>

                <div className="space-y-4">
                    {requests.map((request) => (
                        <div key={request._id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow pr-5">
                            <div className="card-body p-4">
                                <div className="flex items-center space-x-4">
                                    <div className="avatar">
                                        <div className="w-16 h-16 rounded-full">
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
                                        <h2 className="card-title text-lg">
                                            {request.fromUserId.firstName} {request.fromUserId.lastName}
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            Sent on {new Date(request.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleAccept(request._id)}
                                            className="btn btn-sm btn-primary px-4"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleDecline(request._id)}
                                            className="btn btn-sm btn-outline px-4"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ReceivedConnectionRequests;