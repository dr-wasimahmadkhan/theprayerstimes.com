import React from 'react';

const MosqueViewModal = props => {
  const { show, toggleModal, children } = props;
  return (
    <div
      class={`modal bd-example-modal-lg ${show ? 'show' : ''}`}
      id="exampleModalCenter"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalCenterTitle"
      aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div
          class="modal-content"
          style={{ height: '800px', overflow: 'scroll' }}>
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">
              Mosque Details
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={toggleModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">{children}</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={toggleModal}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export { MosqueViewModal };
