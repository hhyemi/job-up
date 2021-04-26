import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/modal.css';

const Modal = (props) => {
  const { open, close, header, children, todoCheck } = props;

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
            {todoCheck && (
              <button type="button" className="btn btn-primary " onClick={close} style={{ float: 'left' }}>
                {' '}
                등록{' '}
              </button>
            )}
            <button type="button" className="closebtn" onClick={close}>
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
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  header: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
  todoCheck: PropTypes.bool.isRequired
};

export default Modal;
