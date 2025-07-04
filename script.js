

function addExperience() {
  const container = document.getElementById('experienceContainer');
  const newExp = document.createElement('div');
  newExp.className = 'dynamic-section';
  newExp.innerHTML = `
    <button class="remove-button" onclick="this.parentElement.remove(); updatePreview();">Remove</button>
    <div class="form-group">
      <label>Job Title</label>
      <input type="text" class="jobTitle" placeholder="Software Engineer">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Company</label>
        <input type="text" class="company" placeholder="Tech Corp">
      </div>
      <div class="form-group">
        <label>Duration</label>
        <input type="text" class="duration" placeholder="Jan 2020 - Present">
      </div>
    </div>
    <div class="form-group">
      <label>Description</label>
      <textarea class="description" placeholder="Describe your responsibilities and achievements..."></textarea>
    </div>
  `;
  container.appendChild(newExp);
  newExp.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      updatePreview();
      updateCoverLetter();
    });
  });
}

function addEducation() {
  const container = document.getElementById('educationContainer');
  const newEdu = document.createElement('div');
  newEdu.className = 'dynamic-section';
  newEdu.innerHTML = `
    <button class="remove-button" onclick="this.parentElement.remove(); updatePreview();">Remove</button>
    <div class="form-group">
      <label>Degree</label>
      <input type="text" class="degree" placeholder="Bachelor of Science in Computer Science">
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Institution</label>
        <input type="text" class="institution" placeholder="University of Technology">
      </div>
      <div class="form-group">
        <label>Year</label>
        <input type="text" class="year" placeholder="2018">
      </div>
    </div>
  `;
  container.appendChild(newEdu);
  newEdu.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', () => {
      updatePreview();
      updateCoverLetter();
    });
  });
}

// --- Tab Switching ---

function showTab(tabName) {
  document.getElementById('resumePreview').style.display = tabName === 'resume' ? 'block' : 'none';
  document.getElementById('coverLetterPreview').style.display = tabName === 'cover-letter' ? 'block' : 'none';
  document.querySelectorAll('.tab-button').forEach((btn, i) => {
    btn.classList.toggle('active', (tabName === 'resume' && i === 0) || (tabName === 'cover-letter' && i === 1));
  });
}

// --- Resume/Cover Letter Preview Updates ---

function updatePreview() {
  document.getElementById('previewName').textContent = document.getElementById('fullName').value || 'Your Name';
  document.getElementById('previewEmail').textContent = document.getElementById('email').value || 'email@example.com';
  document.getElementById('previewPhone').textContent = document.getElementById('phone').value || '+1 (555) 123-4567';
  document.getElementById('previewLocation').textContent = document.getElementById('location').value || 'City, State';
  document.getElementById('previewLinkedin').textContent = document.getElementById('linkedin').value || 'LinkedIn Profile';
  document.getElementById('previewSummary').textContent = document.getElementById('summary').value || 'Your professional summary will appear here...';
  updateExperiencePreview();
  updateEducationPreview();
  updateSkillsPreview();
}

function updateExperiencePreview() {
  const container = document.getElementById('previewExperience');
  const experiences = document.querySelectorAll('#experienceContainer .dynamic-section');
  container.innerHTML = '';
  experiences.forEach(exp => {
    const jobTitle = exp.querySelector('.jobTitle').value;
    const company = exp.querySelector('.company').value;
    const duration = exp.querySelector('.duration').value;
    const description = exp.querySelector('.description').value;
    if (jobTitle || company) {
      const expDiv = document.createElement('div');
      expDiv.className = 'experience-item';
      expDiv.innerHTML = `
        <h3>${jobTitle || 'Job Title'}</h3>
        <div class="experience-meta">${company || 'Company'} • ${duration || 'Duration'}</div>
        <p>${description || 'Job description and achievements...'}</p>
      `;
      container.appendChild(expDiv);
    }
  });
}

function updateEducationPreview() {
  const container = document.getElementById('previewEducation');
  const educations = document.querySelectorAll('#educationContainer .dynamic-section');
  container.innerHTML = '';
  educations.forEach(edu => {
    const degree = edu.querySelector('.degree').value;
    const institution = edu.querySelector('.institution').value;
    const year = edu.querySelector('.year').value;
    if (degree || institution) {
      const eduDiv = document.createElement('div');
      eduDiv.className = 'education-item';
      eduDiv.innerHTML = `
        <h3>${degree || 'Degree'}</h3>
        <div class="education-meta">${institution || 'Institution'} • ${year || 'Year'}</div>
      `;
      container.appendChild(eduDiv);
    }
  });
}

function updateSkillsPreview() {
  const container = document.getElementById('previewSkills');
  const skills = document.getElementById('skills').value;
  container.innerHTML = '';
  if (skills) {
    skills.split(',').map(skill => skill.trim()).filter(Boolean).forEach(skill => {
      const skillSpan = document.createElement('span');
      skillSpan.className = 'skill-item';
      skillSpan.textContent = skill;
      container.appendChild(skillSpan);
    });
  } else {
    const skillSpan = document.createElement('span');
    skillSpan.className = 'skill-item';
    skillSpan.textContent = 'Sample Skill';
    container.appendChild(skillSpan);
  }
}

function updateCoverLetter() {
  const name = document.getElementById('fullName').value || 'Your Name';
  const email = document.getElementById('email').value || 'email@example.com';
  const phone = document.getElementById('phone').value || '+1 (555) 123-4567';
  const location = document.getElementById('location').value || 'City, State';
  const jobTitle = document.getElementById('jobTitle').value || 'Software Engineer';
  const companyName = document.getElementById('companyName').value || 'Company Name';
  document.getElementById('clName').textContent = name;
  document.getElementById('clEmail').textContent = email;
  document.getElementById('clPhone').textContent = phone;
  document.getElementById('clLocation').textContent = location;
  document.getElementById('clCompany').textContent = companyName;
  document.getElementById('clJobTitle').textContent = jobTitle;
  document.getElementById('clCompanyName').textContent = companyName;
  document.getElementById('clCompanyName2').textContent = companyName;
  document.getElementById('clNameClosing').textContent = name;
  document.getElementById('clDate').textContent = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

// --- PDF Download ---

function downloadPDF(type) {
  const { jsPDF } = window.jspdf;
  const element = type === 'resume' ? document.getElementById('resumePreview') : document.getElementById('coverLetterPreview');
  html2canvas(element, { scale: 2, useCORS: true, allowTaint: true }).then(canvas => {
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4', compress: true });
    const imgData = canvas.toDataURL('image/png', 1.0);
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');
    pdf.setFontSize(8);
    pdf.setTextColor(200, 200, 200);
    pdf.text('Generated by Resume Builder Pro', 10, 290);
    pdf.save(`${type}-${document.getElementById('fullName').value || 'user'}-${new Date().toISOString().split('T')[0]}.pdf`);
  });
}

// --- AI Content Generation (calls backend) ---

async function generateSmartContentWithAI() {
  const jobTitle = document.getElementById('jobTitle').value || 'Software Engineer';
  const jobDescription = document.getElementById('jobDescription').value || '';
  const skills = document.getElementById('skills').value || '';
  const prompt = `Write a professional summary for a ${jobTitle} with these skills: ${skills}. Job description: ${jobDescription}`;
  try {
    const res = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await res.json();
    document.getElementById('summary').value = data.choices[0].text.trim();
    updatePreview();
    // Optionally, generate cover letter as well:
    const clPrompt = `Write a cover letter for a ${jobTitle} applying to ${document.getElementById('companyName').value || 'Company'} based on this job description: ${jobDescription}`;
    const clRes = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: clPrompt })
    });
    const clData = await clRes.json();
    document.getElementById('clParagraph1').innerHTML = clData.choices[0].text.trim();
    updateCoverLetter();
    alert('AI content generated!');
  } catch (err) {
    alert('Error generating content');
  }
}

// --- Job Search (calls backend) ---

async function searchJobs() {
  const jobTitle = document.getElementById('jobTitle').value || 'Software Engineer';
  const location = document.getElementById('location').value || 'United States';
  try {
    const res = await fetch(`/api/jobs?query=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`);
    const data = await res.json();
    displayJobResults(data.jobs || []);
  } catch (err) {
    alert('Unable to fetch job listings');
  }
}

function displayJobResults(jobs) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';
  modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;`;
  const modalContent = document.createElement('div');
  modalContent.style.cssText = `background: white; padding: 30px; border-radius: 15px; max-width: 800px; max-height: 600px; overflow-y: auto; box-shadow: 0 20px 40px rgba(0,0,0,0.2);`;
  let jobsHTML = '<h2>Job Opportunities</h2>';
  if (jobs.length === 0) {
    jobsHTML += '<p>No jobs found for your criteria.</p>';
  } else {
    jobs.slice(0, 10).forEach(job => {
      jobsHTML += `
        <div style="border: 1px solid #e2e8f0; padding: 15px; margin: 10px 0; border-radius: 8px;">
          <h3 style="color: #667eea; margin: 0 0 10px 0;">${job.title || 'Job Title'}</h3>
          <p><strong>Company:</strong> ${job.company || 'Company Name'}</p>
          <p><strong>Location:</strong> ${job.location || 'Location'}</p>
          <p style="color: #666; font-size: 14px;">${(job.description || '').substring(0, 200)}...</p>
          ${job.url ? `<a href="${job.url}" target="_blank" style="color: #667eea;">View Job</a>` : ''}
        </div>
      `;
    });
  }
  jobsHTML += '<button onclick="this.closest(\'.modal-overlay\').remove()" style="background: #667eea; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; margin-top: 20px;">Close</button>';
  modalContent.innerHTML = jobsHTML;
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

// --- Email Resume (calls backend) ---

async function emailResume() {
  const recipientEmail = prompt('Enter recipient email address:');
  if (!recipientEmail) return;
  const senderName = document.getElementById('fullName').value || 'Job Applicant';
  const jobTitle = document.getElementById('jobTitle').value || 'Position';
  const companyName = document.getElementById('companyName').value || 'Your Company';
  const html = document.getElementById('resumePreview').innerHTML;
  try {
    await fetch('/api/sendgrid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: recipientEmail,
        subject: `Resume Application - ${senderName} for ${jobTitle} Position`,
        html: `
          <h2>Resume Application</h2>
          <p>Dear Hiring Manager,</p>
          <p>Please find attached the resume for <strong>${senderName}</strong> applying for the <strong>${jobTitle}</strong> position at ${companyName}.</p>
          <div style="border: 1px solid #ddd; padding: 20px; margin: 20px 0;">
            ${html}
          </div>
          <p>Best regards,<br>${senderName}</p>
        `
      })
    });
    alert(`Resume sent successfully to ${recipientEmail}!`);
  } catch (err) {
    alert('Error sending email');
  }
}

// --- Load Sample Data, Generate Resume, Generate Cover Letter ---

function loadSampleData() {
  document.getElementById('fullName').value = 'Sarah Johnson';
  document.getElementById('email').value = 'sarah.johnson@email.com';
  document.getElementById('phone').value = '+1 (555) 987-6543';
  document.getElementById('location').value = 'San Francisco, CA';
  document.getElementById('linkedin').value = 'linkedin.com/in/sarahjohnson';
  document.getElementById('summary').value = 'Experienced software engineer with 5+ years of expertise in full-stack development, specializing in React, Node.js, and cloud technologies. Proven track record of building scalable applications and leading development teams to deliver high-quality software solutions.';

  // Add sample experience
  const firstExp = document.querySelector('#experienceContainer .dynamic-section');
  if (firstExp) {
    firstExp.querySelector('.jobTitle').value = 'Senior Software Engineer';
    firstExp.querySelector('.company').value = 'TechCorp Inc.';
    firstExp.querySelector('.duration').value = 'Jan 2021 - Present';
    firstExp.querySelector('.description').value = 'Led development of microservices architecture serving 1M+ users. Improved application performance by 40% through code optimization and caching strategies. Mentored junior developers and conducted code reviews.';
  }

  // Add sample education
  const firstEdu = document.querySelector('#educationContainer .dynamic-section');
  if (firstEdu) {
    firstEdu.querySelector('.degree').value = 'Bachelor of Science in Computer Science';
    firstEdu.querySelector('.institution').value = 'Stanford University';
    firstEdu.querySelector('.year').value = '2019';
  }

  document.getElementById('skills').value = 'JavaScript, React, Node.js, Python, AWS, Docker, MongoDB, PostgreSQL, Git, Agile, REST APIs, GraphQL';
  document.getElementById('jobTitle').value = 'Senior Software Engineer';
  document.getElementById('companyName').value = 'Google';
  document.getElementById('jobDescription').value = 'We are looking for a Senior Software Engineer with expertise in JavaScript, React, and Node.js to join our team. The ideal candidate will have experience with cloud technologies, microservices architecture, and leading development teams.';

  updatePreview();
  updateCoverLetter();
  showTab('resume');
}

function generateResume() {
  updatePreview();
  showTab('resume');
}

function generateCoverLetter() {
  updateCoverLetter();
  showTab('cover-letter');
}

// --- Event Listeners for Real-Time Updates ---

document.addEventListener('DOMContentLoaded', function() {
  updatePreview();
  updateCoverLetter();
  document.querySelectorAll('input, textarea, select').forEach(input => {
    input.addEventListener('input', function() {
      updatePreview();
      updateCoverLetter();
    });
  });
  // Show resume tab by default
  showTab('resume');
});