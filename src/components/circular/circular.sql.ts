export class CircularSql {
    public GET_CIRCULARS = `
        SELECT title, pdf_link AS pdfLink, image_link AS imageLink  FROM circular c 
        WHERE c.school_id = ?
        ORDER BY c.created_at DESC
        limit 0,5;
    `;

}