import React from 'react';
import './Submit.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function SubmitModal(props) {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onClick={(e) => e.stopPropagation()}
    >
      <Modal.Header closeButton>
        <h4 className='submit-header'>
          Xác nhận hoàn thành thử thách <span>IQ Challenge</span>
        </h4>
      </Modal.Header>
      <Modal.Body>
        <div className='submit-body'>
          <p>
            Bạn nên kiểm tra bài làm trước khi nộp để chắc chắn trả lời đầy đủ
            các câu hỏi. Sau khi <span>Nộp bài,</span> hành động này không thể
            hoàn tác.
          </p>
          <div>Bạn chắc chắn muốn nộp bài chứ?</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className='submit-footer'>
          <button onClick={props.onHide}>Close</button>
          <button onClick={props.onClick}>Nộp bài</button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SubmitModal;
