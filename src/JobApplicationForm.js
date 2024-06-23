
import useForm from './useForm';
import './JobApplicationForm.css';

const JobApplicationForm = () => {
  const initialFormState = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    experience: '',
    portfolioUrl: '',
    managementExperience: '',
    skills: [],
    interviewTime: ''
  };

  const { formValues, handleInputChange, handleCheckboxChange, handleSubmit, errors } = useForm(initialFormState, validate);

  function validate(values) {
    let errors = {};
    if (!values.fullName) errors.fullName = "Full name is required.";
    if (!values.email) errors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(values.email)) errors.email = "Email address is invalid.";
    if (!values.phoneNumber) errors.phoneNumber = "Phone number is required.";
    else if (!/^\d+$/.test(values.phoneNumber)) errors.phoneNumber = "Phone number is invalid.";
    if (values.position === "Developer" || values.position === "Designer") {
      if (!values.experience) errors.experience = "Relevant experience is required.";
      else if (values.experience <= 0) errors.experience = "Experience must be greater than 0.";
    }
    if (values.position === "Designer") {
      if (!values.portfolioUrl) errors.portfolioUrl = "Portfolio URL is required.";
      else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.portfolioUrl)) errors.portfolioUrl = "URL is invalid.";
    }
    if (values.skills.length === 0) errors.skills = "At least one skill must be selected.";
    if (!values.interviewTime) errors.interviewTime = "Preferred interview time is required.";
    else if (isNaN(Date.parse(values.interviewTime))) errors.interviewTime = "Interview time is invalid.";
    return errors;
  }

  return (
    <div className="form-container">
      <h1>Job Application Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullName" value={formValues.fullName} onChange={handleInputChange} />
          {errors.fullName && <p className="error">{errors.fullName}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formValues.email} onChange={handleInputChange} />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formValues.phoneNumber} onChange={handleInputChange} />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
        </div>
        <div className="form-group">
          <label>Applying for Position:</label>
          <select name="position" value={formValues.position} onChange={handleInputChange}>
            <option value="">Select</option>
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        {(formValues.position === "Developer" || formValues.position === "Designer") && (
          <div className="form-group">
            <label>Relevant Experience (years):</label>
            <input type="number" name="experience" value={formValues.experience} onChange={handleInputChange} />
            {errors.experience && <p className="error">{errors.experience}</p>}
          </div>
        )}
        {formValues.position === "Designer" && (
          <div className="form-group">
            <label>Portfolio URL:</label>
            <input type="url" name="portfolioUrl" value={formValues.portfolioUrl} onChange={handleInputChange} />
            {errors.portfolioUrl && <p className="error">{errors.portfolioUrl}</p>}
          </div>
        )}
        {formValues.position === "Manager" && (
          <div className="form-group">
            <label>Management Experience:</label>
            <textarea name="managementExperience" value={formValues.managementExperience} onChange={handleInputChange}></textarea>
          </div>
        )}
        <div className="form-group">
          <label>Additional Skills:</label>
          <div>
            {["JavaScript", "CSS", "Python"].map(skill => (
              <label key={skill}>
                <input
                  type="checkbox"
                  name="skills"
                  value={skill}
                  checked={formValues.skills.includes(skill)}
                  onChange={handleCheckboxChange}
                />
                {skill}
              </label>
            ))}
          </div>
          {errors.skills && <p className="error">{errors.skills}</p>}
        </div>
        <div className="form-group">
          <label>Preferred Interview Time:</label>
          <input type="datetime-local" name="interviewTime" value={formValues.interviewTime} onChange={handleInputChange} />
          {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {formValues.submitted && (
        <div className="summary">
          <h2>Application Summary</h2>
          <p><strong>Full Name:</strong> {formValues.fullName}</p>
          <p><strong>Email:</strong> {formValues.email}</p>
          <p><strong>Phone Number:</strong> {formValues.phoneNumber}</p>
          <p><strong>Position:</strong> {formValues.position}</p>
          {formValues.position === "Developer" || formValues.position === "Designer" ? (
            <p><strong>Relevant Experience:</strong> {formValues.experience} years</p>
          ) : null}
          {formValues.position === "Designer" ? (
            <p><strong>Portfolio URL:</strong> {formValues.portfolioUrl}</p>
          ) : null}
          {formValues.position === "Manager" ? (
            <p><strong>Management Experience:</strong> {formValues.managementExperience}</p>
          ) : null}
          <p><strong>Skills:</strong> {formValues.skills.join(", ")}</p>
          <p><strong>Preferred Interview Time:</strong> {formValues.interviewTime}</p>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;