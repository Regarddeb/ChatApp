import Logo from "@sharedComponents/misc/Logo"
import mesh_gradient from "@assets/images/background/mesh_gradients.svg"

export default function SignupMessage() {
    return (
        <>
            <Logo width={50} height={50} />
            <div className='text-start space-y-2 opacity-80'
                style={{
                    background: `url(${mesh_gradient})`,
                    backgroundSize: 'cover',
                    WebkitTextFillColor: 'transparent',
                    WebkitBackgroundClip: 'text',
                }}
            >
                <h2 className='text-6xl font-bold'>Create your account</h2>
            </div>
            <p className='opacity-70 font-medium w-9/12 text-start py-3'>Fill out the form below to get started.</p>
        </>
    )
}