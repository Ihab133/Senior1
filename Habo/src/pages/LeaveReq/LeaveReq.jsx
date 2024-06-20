import "./LeaveReq.scss";


function LeaveReq() {
  return (
    <div className="leave-management">
      <div className="leave-management__header">
        <h1>Leave Form</h1>
      </div>
      <form className="leave-management__form">
        <div className="leave-management__form-group">
          <label htmlFor="leave-type">Leave Type</label>
          <select id="leave-type" className="leave-management__select">
            <option value="">Select Leave Type</option>
            <option value="half-day">Half Day</option>
            <option value="full-day">Full Day</option>
          </select>
        </div>
        <div className="leave-management__form-group">
          <label>
            <input type="radio" name="duration" value="half-day" /> Half Day
          </label>
          <label>
            <input type="radio" name="duration" value="full-day" /> Full Day
          </label>
        </div>
        <div className="leave-management__form-group">
          <label htmlFor="from-date">From</label>
          <input type="date" id="from-date" className="leave-management__input" />
          <label htmlFor="to-date">To</label>
          <input type="date" id="to-date" className="leave-management__input" />
        </div>
        <div className="leave-management__form-group">
          <label htmlFor="documents">Attach Documents</label>
          <input type="file" id="documents" className="leave-management__file-input" />
        </div>
        <div className="leave-management__form-group">
          <label htmlFor="notes">Notes</label>
          <textarea id="notes" className="leave-management__textarea"></textarea>
        </div>
        <button type="submit" className="leave-management__submit">Submit</button>
      </form>
    </div>
  );
}

export default LeaveReq
