const Footer = () => {
    return (
      <footer className="bg-purple-lightplus py-10 px-10">
        <div className="w-full mx-auto flex justify-around">
          <div className="flex space-x-20">
            <div className="px-10">
              <h4 className="font-semibold text-gray-800">¿Quiénes somos?</h4>
              <a href="#" className="block text-gray-600 hover:text-purple-600">Nuestra misión</a>
              <a href="#" className="block text-gray-600 hover:text-purple-600">Conócenos</a>
            </div>
            <div className="px- 10">
              <h4 className="font-semibold text-gray-800">Ayuda</h4>
              <a href="#" className="block text-gray-600 hover:text-purple-600">Términos y condiciones</a>
              <a href="#" className="block text-gray-600 hover:text-purple-600">Política y privacidad</a>
            </div>
            <div className="px-10">
              <h4 className="font-semibold text-gray-800">Síguenos</h4>
              <div className="flex space-x-2">
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.04c-5.5 0-10 4.5-10 10 0 4.41 3.59 8.04 8 8.89v-6.28h-2.4v-2.61h2.4v-1.99c0-2.39 1.46-3.69 3.59-3.69 1.02 0 1.89.08 2.14.11v2.48h-1.47c-1.15 0-1.37.55-1.37 1.35v1.75h2.74l-.36 2.61h-2.38v6.28c4.41-.85 8-4.48 8-8.89 0-5.5-4.5-10-10-10z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.04c-5.5 0-10 4.5-10 10 0 5.5 4.5 10 10 10s10-4.5 10-10c0-5.5-4.5-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-.5-13.5h1v5l4.5 2.7-.7 1.3-5.3-3.2v-5.8z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;