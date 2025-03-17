import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const createAndDownloadAttendPdf = async (req, res) => {
    try {
        const { date, classx, students, attendance } = req.body;

        console.log("📤 Генерация PDF...");

        const pdfName = `attendance-report-${date}.pdf`;
        const pdfPath = path.join(__dirname, pdfName);

        const doc = new PDFDocument();
        const writeStream = fs.createWriteStream(pdfPath);
        doc.pipe(writeStream);

        doc.fontSize(18).text('Attendance Report', { align: 'center' }).moveDown();
        doc.fontSize(14).text(`Дата: ${date}`);
        doc.fontSize(14).text(`Класс: ${classx}`).moveDown();

        doc.fontSize(12).text('Список студентов:', { underline: true }).moveDown();
        students.forEach((student, index) => {
            const status = attendance[student.id] ? "✅ Присутствовал" : "❌ Отсутствовал";
            doc.text(`${index + 1}. ${student.name} - ${status}`);
        });

        doc.end();

        writeStream.on('finish', () => {
            console.log("📥 Отправка PDF клиенту...");
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${pdfName}"`);
            res.sendFile(pdfPath, (err) => {
                if (err) {
                    console.error("❌ Ошибка при отправке PDF:", err);
                    res.status(500).json({ error: "Ошибка сервера" });
                }
                fs.unlinkSync(pdfPath);
            });
        });

    } catch (error) {
        console.error("❌ Ошибка при создании PDF:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
};

export default createAndDownloadAttendPdf;