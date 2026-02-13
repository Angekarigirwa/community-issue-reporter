// Global array of issues
let issues = JSON.parse(localStorage.getItem('issues')) || [];

// Form submission for report.html
const issueForm = document.getElementById('issueForm');
if (issueForm) {
  issueForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const location = document.getElementById('location').value;

    const issue = {
      id: Date.now(),
      title,
      description,
      category,
      location,
      date: new Date().toLocaleDateString(),
      status: 'Reported'
    };

    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));
    alert('Issue reported successfully!');
    issueForm.reset();
  });
}

// Delete function
function deleteIssue(id) {
  issues = issues.filter(issue => issue.id !== id);
  localStorage.setItem('issues', JSON.stringify(issues));
  renderDashboard();
}

// Update status function
function updateStatus(id) {
  issues = issues.map(issue => {
    if (issue.id === id) {
      if (issue.status === 'Reported') issue.status = 'In Progress';
      else if (issue.status === 'In Progress') issue.status = 'Resolved';
    }
    return issue;
  });
  localStorage.setItem('issues', JSON.stringify(issues));
  renderDashboard();
}

// Update status summary
function updateStatusSummary() {
  const summary = document.getElementById('statusSummary');
  if (!summary) return;

  const reportedCount = issues.filter(i => i.status === 'Reported').length;
  const inProgressCount = issues.filter(i => i.status === 'In Progress').length;
  const resolvedCount = issues.filter(i => i.status === 'Resolved').length;

  summary.innerHTML = `
    <p>
      <strong>Reported:</strong> ${reportedCount} |
      <strong>In Progress:</strong> ${inProgressCount} |
      <strong>Resolved:</strong> ${resolvedCount}
    </p>
    <hr>
  `;
}

// Render dashboard
function renderDashboard(filter = 'All') {
  const issueList = document.getElementById('issueList');
  if (!issueList) return;

  issueList.innerHTML = '';

  // Filter issues if needed
  const filteredIssues = (filter === 'All') 
    ? issues 
    : issues.filter(issue => issue.category === filter);

  if (filteredIssues.length === 0) {
    issueList.innerHTML = '<p>No issues reported yet.</p>';
    updateStatusSummary();
    return;
  }

  filteredIssues.forEach(issue => {
    const div = document.createElement('div');
    div.className = 'issue-card';

    div.innerHTML = `
      <h3>${issue.title}</h3>
      <p><strong>Category:</strong> ${issue.category}</p>
      <p><strong>Location:</strong> ${issue.location}</p>
      <p><strong>Description:</strong> ${issue.description}</p>
      <p><strong>Status:</strong>
        <span class="status ${issue.status.replace(' ', '-')}">
          ${issue.status}
        </span>
      </p>
      <button class="update-btn">Update Status</button>
      <button class="delete-btn">Delete</button>
    `;

    issueList.appendChild(div);

    // Buttons
    div.querySelector('.update-btn')
      .addEventListener('click', () => updateStatus(issue.id));

    div.querySelector('.delete-btn')
      .addEventListener('click', () => deleteIssue(issue.id));
  });

  updateStatusSummary();
}

// ✅ ADD CATEGORY FILTER LOGIC HERE
const categoryFilter = document.getElementById('categoryFilter');
if (categoryFilter) {
  categoryFilter.addEventListener('change', () => {
    renderDashboard(categoryFilter.value);
  });
}

// Initial render
renderDashboard();
updateStatusSummary();
