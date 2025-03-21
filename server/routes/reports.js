import express from 'express';
import { PDFDocument, rgb } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Attendance, Nutrition } from '../models/models.js';
import * as fontkit from 'fontkit';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get('/generate-pdf', async (req, res) => {
    try {
        const attendanceList = await Attendance.findAll();
        const nutritionList = await Nutrition.findAll();

        console.log('Attendance List:', attendanceList);
        console.log('Nutrition List:', nutritionList);

        if (!attendanceList.length && !nutritionList.length) {
            return res.status(404).json({ message: 'Нет данных для отчета' });
        }

        const pdfDoc = await PDFDocument.create();
        pdfDoc.registerFontkit(fontkit);

        let page = pdfDoc.addPage([600, 1200]);
        const { width, height } = page.getSize();

        const fontPath = path.join(__dirname, '../fonts/arialmt.ttf');
        if (!fs.existsSync(fontPath)) {
            console.error('Шрифт не найден по пути:', fontPath);
            return res.status(500).json({ message: 'Шрифт не найден' });
        }

        const fontBytes = fs.readFileSync(fontPath);
        const customFont = await pdfDoc.embedFont(fontBytes);

        let y = height - 50;

        page.drawText('Отчет по посещаемости', { x: 50, y, size: 18, font: customFont, color: rgb(0, 0, 0) });
        y -= 30;

        attendanceList.forEach(attendance => {
            if (y < 50) {
                const newPage = pdfDoc.addPage([600, 1200]);
                y = newPage.getSize().height - 50;
                page = newPage;
            }
            const text = `${attendance.date}: ${attendance.studentName} - ${attendance.status}`;
            console.log(`Drawing attendance text: ${text} at y: ${y}`);
            page.drawText(text, { x: 50, y, size: 12, font: customFont });
            y -= 20;
        });

        y -= 20;

        page.drawText('Отчет по питанию', { x: 50, y, size: 18, font: customFont, color: rgb(0, 0, 0) });
        y -= 30;

        nutritionList.forEach(nutrition => {
            if (y < 50) {
                const newPage = pdfDoc.addPage([600, 1200]);
                y = newPage.getSize().height - 50;
                page = newPage;
            }
            const text = `${nutrition.date.toISOString().split('T')[0]}: ${nutrition.name} - ${nutrition.type}`;
            console.log(`Drawing nutrition text: ${text} at y: ${y}`);
            page.drawText(text, { x: 50, y, size: 12, font: customFont });
            y -= 20;
        });

        const pdfBytes = await pdfDoc.save();

        fs.writeFileSync('test.pdf', pdfBytes);

        res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBytes);
    } catch (error) {
        console.error('Ошибка при генерации отчета:', error);
        res.status(500).json({ message: 'Ошибка при генерации отчета', error });
    }
});

export default router;