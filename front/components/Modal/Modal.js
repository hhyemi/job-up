import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/modal.css';

const Modal = (props) => {
  const { open, close, header, children } = props;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button type="button" className="close" onClick={close}>
              {' '}
              &times;{' '}
            </button>
          </header>
          <main>{children}</main>
          <footer>
            <button type="button" className="closebtn close" onClick={close}>
              {' '}
              닫기{' '}
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
};

export default Modal;
