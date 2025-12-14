import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import WifiIcon from '@mui/icons-material/Wifi';

const NetworkStatus = () => {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [offlineSnackbarKey, setOfflineSnackbarKey] = useState(null);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            // Close the offline notification
            if (offlineSnackbarKey) {
                closeSnackbar(offlineSnackbarKey);
                setOfflineSnackbarKey(null);
            }
            // Show reconnected message
            enqueueSnackbar('Internet connection restored', {
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
            });
        };

        const handleOffline = () => {
            setIsOnline(false);
            // Show persistent offline notification
            const key = enqueueSnackbar('No internet connection. Please check your network.', {
                variant: 'error',
                persist: true,
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                },
                action: () => (
                    <WifiOffIcon sx={{ color: 'white' }} />
                ),
            });
            setOfflineSnackbarKey(key);
        };

        // Add event listeners
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Check initial status
        if (!navigator.onLine) {
            handleOffline();
        }

        // Cleanup
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [enqueueSnackbar, closeSnackbar, offlineSnackbarKey]);

    // Optional: Show a persistent banner at the top when offline
    if (!isOnline) {
        return (
            <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 text-center z-50 flex items-center justify-center gap-2">
                <WifiOffIcon sx={{ fontSize: '20px' }} />
                <span className="font-medium">No Internet Connection</span>
            </div>
        );
    }

    return null;
};

export default NetworkStatus;
