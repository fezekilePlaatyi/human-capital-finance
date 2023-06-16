import React from "react";
import CloseIcon from '@mui/icons-material/Close';

const DeclineReason = () => {
    return(
        <div class="decline-reason shadow">
            <div class="content-container">
                <h5>Reason for declining</h5>
                <button class="close-btn"><CloseIcon /></button>
                <form action="" method="post">
                    <div class="input-group">
                        <input type="radio" name="decline_reason" id="credit_score" />
                        <label for="credit_score">Low Credit Score</label>
                    </div>
                    <div class="input-group">
                        <input type="radio" name="decline_reason" id="employment_incorrect" />
                        <label for="employment_incorrect">Can Not Verify Employment</label>
                    </div>
                    <div class="input-group">
                        <input type="radio" name="decline_reason" id="other" />
                        <label for="other">Other Reason</label>
                    </div>
                    <input type="text" class="other-reason" name="other_reason" id="other_reason" placeholder="Other reason" />
                    <div class="decline-btns">
                        <button type="button" class="no-border-btn">Cancel</button>
                        <button type="button" class="main-btn">Send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeclineReason;