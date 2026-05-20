import {
  signInWithRedirect,
  signOut,
} from 'aws-amplify/auth'

export default function AuthButtons({
  user,
}) {
  async function handleLogin() {
    await signInWithRedirect()
  }

  async function handleLogout() {
    await signOut()
  }

  return (
    <div>
      {user ? (
        <button
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleLogin}
        >
          Login
        </button>
      )}
    </div>
  )
}