
/**
 * Parents
 *  - LoginForm
 *  - RegistrationForm
 * 
 * Renders
 *  Loading Animation Allover Screen
 */


export default function Preloader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-[0.8]">
      {/* <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid" /> */}
      <svg height={"50px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="15"
          r="15"
          cx="40"
          cy="65"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          ></animate>
        </circle>
        <circle
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="15"
          r="15"
          cx="100"
          cy="65"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          ></animate>
        </circle>
        <circle
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="15"
          r="15"
          cx="160"
          cy="65"
        >
          <animate
            attributeName="cy"
            calcMode="spline"
            dur="2"
            values="65;135;65;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="0"
          ></animate>
        </circle>
      </svg>
    </div>
  );
}
