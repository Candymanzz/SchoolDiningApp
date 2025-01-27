import { ReportData } from "./ReportData.1";

const generateAttendanceReport = ({
    employee,
    events,
    participants,
    students,
    classes,
}: ReportData): string => {
    const eventRows = events
        .map(
            (event) => `
            <tr class="item">
                <td>${event.eventName}</td>
                <td>${event.eventDate}</td>
            </tr>
        `
        )
        .join('');

    const participantRows = participants
        .map(
            (participant) => `
            <tr class="item">
                <td>${participant.name}</td>
                <td>${participant.status}</td>
            </tr>
        `
        )
        .join('');

    return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Attendance Report</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
                <style>
                    .report-box {
                        max-width: 800px;
                        margin: auto;
                        padding: 30px;
                        border: 1px solid #ddd;
                        box-shadow: 0 0 10px rgba(0, 0, 0, .1);
                        font-size: 16px;
                        line-height: 24px;
                        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
                        color: #333;
                    }
                    .justify-center {
                        text-align: center;
                    }
                    .report-box table {
                        width: 100%;
                        line-height: inherit;
                        text-align: left;
                    }
                    .report-box table td {
                        padding: 10px;
                        vertical-align: top;
                    }
                    .report-box table tr.heading td {
                        background: #f8f9fa;
                        font-weight: bold;
                    }
                    .report-box table tr.item td {
                        border-bottom: 1px solid #dee2e6;
                    }
                    @media only screen and (max-width: 600px) {
                        .report-box table tr.top table td {
                            width: 100%;
                            display: block;
                            text-align: center;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="report-box">
                    <h2 class="justify-center">Attendance Report</h2>
                    <p class="justify-center">Employee: ${employee}</p>
                    <h3>Events</h3>
                    <table class="table">
                        <thead>
                            <tr class="heading">
                                <th>Event Name</th>
                                <th>Event Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${eventRows}
                        </tbody>
                    </table>
                    <h3>Participants</h3>
                    <table class="table">
                        <thead>
                            <tr class="heading">
                                <th>Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${participantRows}
                        </tbody>
                    </table>
                </div>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            </body>
        </html>
    `;
};

export default generateAttendanceReport;
