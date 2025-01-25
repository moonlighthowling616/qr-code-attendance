const dataToImport = {
  database: "capstone-db",
  version: 1,
  encrypted: false,
  mode: "full",
  tables: [
    {
      name: "students",
      schema: [
        { column: "id", value: "INTEGER PRIMARY KEY NOT NULL" },
        { column: "name", value: "TEXT NOT NULL" },
        { column: "strand", value: "TEXT NOT NULL" },
        { column: "id_number", value: "TEXT NOT NULL UNIQUE" },
      ],
      // indexes: [{ name: "index_user_on_email", column: "email" }],
      values: [
        [1, "Hanni Pham", "IOS-ICT", "S23-9412" ],
        [2, "Danni", "IOS-CUL", "S23-3094" ],
        [3, "Haerin", "IOS-CUL", "S23-9415" ],
        [4, "Minji", "IOS-ICT", "S23-415" ],
        [5, "Hyein", "IOS-CUL", "S23-4123"],
      ],
    },
  ],
};
export default dataToImport;

//CREATE TRIGGER contacts_trigger_last_modified AFTER UPDATE ON contacts FOR EACH ROW WHEN NEW.last_modified <= OLD.last_modified BEGIN UPDATE contacts SET last_modified = (strftime('%s','now')) WHERE id=OLD.id; END;