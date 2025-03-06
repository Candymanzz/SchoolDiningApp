module.exports = ({ date, classx, students, attendance }) => {

    const attendanceMap = attendance.reduce((acc, record) => {
        const key = `${record.studentStudentId}-${record.date}`;
        acc[key] = record.status;
        return acc;
    }, {});

    const studentRows = students.map((std) => {
        const attendanceKey = `${std.student_id}-${date}`;
        const isAttended = attendanceMap[attendanceKey] ?? null;

        return `
            <tr class="item">
                <td>${std.name} ${std.surname}</td>
                <td>${isAttended === true ? "Attended" : isAttended === false ? "Missed" : "N/A"}</td>
            </tr>
        `;
    }).join('');

    return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>Attendance Report</title>
                <style>
                    .invoice-box {
                        max-width: 800px;
                        margin: auto;
                        padding: 30px;
                        border: 1px solid #eee;
                        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                        font-size: 16px;
                        line-height: 24px;
                        font-family: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;
                        color: #555;
                    }
                    .justify-center {
                        text-align: center;
                    }
                    .invoice-box table {
                        width: 100%;
                        line-height: inherit;
                        text-align: left;
                    }
                    .invoice-box table td {
                        padding: 5px;
                        vertical-align: top;
                    }
                    .invoice-box table tr.heading td {
                        background: #eee;
                        border-bottom: 1px solid #ddd;
                        font-weight: bold;
                    }
                    .invoice-box table tr.item td {
                        border-bottom: 1px solid #eee;
                    }
                    .invoice-box table tr.item.last td {
                        border-bottom: none;
                    }
                    @media only screen and (max-width: 600px) {
                        .invoice-box table tr.top table td {
                            width: 100%;
                            display: block;
                            text-align: center;
                        }
                        .invoice-box table tr.information table td {
                            width: 100%;
                            display: block;
                            text-align: center;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="invoice-box">
                    <table cellpadding="0" cellspacing="0">
                        <tr class="top">
                            <td colspan="2">
                                <table>
                                    <tr>
                                        <td class="title">Attendance Report</td>
                                        <td>Date: ${date}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr class="information">
                            <td colspan="2">
                                <table>
                                    <tr>
                                        <td>Class: ${classx}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr class="heading">
                            <td>Student</td>
                            <td>Status</td>
                        </tr>
                        ${studentRows}
                    </table>
                </div>
            </body>
        </html>
    `;
};
