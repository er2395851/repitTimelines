document.getElementById('addEventBtn').addEventListener('click', function() {
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value;
    const date = document.getElementById('eventDate').value;

    if (title && description && date) {
        const timeline = document.querySelector('.timeline');

        // Create new timeline item
        const timelineItem = document.createElement('div');
        timelineItem.classList.add('timeline-item');

        const timelineNode = document.createElement('div');
        timelineNode.classList.add('timeline-node');

        const timelineContent = document.createElement('div');
        timelineContent.classList.add('timeline-content');

        const eventTitle = document.createElement('h2');
        eventTitle.textContent = title;

        const eventDescription = document.createElement('p');
        eventDescription.textContent = description;

        const eventDate = document.createElement('span');
        eventDate.classList.add('timeline-date');
        eventDate.textContent = date;

        // Append elements to their respective parents
        timelineContent.appendChild(eventTitle);
        timelineContent.appendChild(eventDescription);
        timelineContent.appendChild(eventDate);

        timelineItem.appendChild(timelineNode);
        timelineItem.appendChild(timelineContent);

        // Append new timeline item to the timeline
        timeline.appendChild(timelineItem);

        // Clear input fields after adding the event
        document.getElementById('eventTitle').value = '';
        document.getElementById('eventDescription').value = '';
        document.getElementById('eventDate').value = '';
    } else {
        alert('Please fill in all fields.');
    }
});