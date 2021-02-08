import { useAuth } from 'context/auth-context';
import { useGoogleLogin } from 'react-google-login';
import { useSnackbar } from 'react-simple-snackbar';
import { authenticate } from 'utils/api-client';

export default function useAuthAction() {
  const user = useAuth();
  const [openSnackbar] = useSnackbar();
  const { signIn } = useGoogleLogin({
    onSuccess: authenticate,
    clientId:
      '361987034059-u80jcnufuuftjv4i29ri37mi2mgeoab0.apps.googleusercontent.com',
  });

  function handleAuthAction(authAction, data) {
    if (user) {
      authAction(data);
    } else {
      openSnackbar('AutoMAGICally logging you in with Google!');
      setTimeout(async () => {
        await signIn();
        authAction(data);
      }, 500);
    }
  }
  return handleAuthAction;
}
