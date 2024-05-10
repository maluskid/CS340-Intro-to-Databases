select Customers.CustomerName, Invoices.InvoiceID SUM(InvoiceDetails.LineTotal) AS LineSum
FROM InvoiceDetails
inner join Invoices on Customers.CustomerID = Invoices.CustomerID
inner join InvoiceDetails on Invoices.InvoiceID = InvoiceDetails.InvoiceID
group by Invoices.InvoiceID
order by LineSum desc;
