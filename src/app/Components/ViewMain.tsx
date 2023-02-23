import React from 'react';
import ViewRoute from './routes/ViewRoute';
import LogoEmpresa from './../../assets/images/logo.svg';
import './ViewMain.scss';

const ViewMain = () => {
  return (
    <div className="ViewApp">
      <header className="ViewAppHeader">
        <div className='LogoApp'>
          <img src={LogoEmpresa} alt='Logo enterprise' height={70}/>
          <h1>Tetra Sign</h1>
        </div>
        <div className='ContactUsApp'>
          <span className='title'>Datos de contacto</span>
          <span>Teléfono: <a href="tel:+51947644016">+51 947644016</a></span>
          <span>Correo: <a href="mailto:Info@cosmospb.com">Info@cosmospb.com</a></span>
        </div>
      </header>
      <section className='ViewAppContainer'>
        <ViewRoute />
      </section>
    </div>
  );
}

export default ViewMain;
