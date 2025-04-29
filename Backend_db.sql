create schema Blood_Donation_DB;
use Blood_Donation_DB;
show tables;
describe donar_details;
describe admin_details;
insert into admin_details(admin_name,admin_username,admin_password) values("Raghul","root","demo123");
select * from admin_details;
select * from donar_details;
select * from blood_bank;
select * from campaigns;
ALTER TABLE campaigns DROP COLUMN image_url;
UPDATE campaigns SET blood_type_needed = 'O-' wHERE id = 1;
select * from blood_quantity;
select* from blood_request;
CREATE INDEX idx_registration_number ON blood_bank (registration_number);
ALTER TABLE blood_quantity ADD CONSTRAINT FKumldjhcq8pm5fln77ysu7muu FOREIGN KEY (registration_number) REFERENCES blood_bank (registration_number);
ALTER TABLE blood_request DROP COLUMN blood_quantity_id;


