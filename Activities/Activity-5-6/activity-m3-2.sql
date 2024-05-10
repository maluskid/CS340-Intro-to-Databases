SELECT InvoiceDetails.InvoiceID, Products.ProductName
FROM InvoiceDetails
INNER JOIN Products ON InvoiceDetails.ProductNumber = Products.ProductNumber
WHERE InvoiceDetails.InvoiceID = 3
ORDER BY InvoiceDetails.UnitPrice ASC;
