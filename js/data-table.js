new Vue({
    el: "#data-table",
    data: {
        items: null,
        iteratee: null,
        order: null,
        searchKeyword: null,
        page: 1,
        perPage: 10,
        pages: [],
        showNewEmployee: false,
        newEmployee: {
            name: null,
            position: null,
            age: null,
            office: null,
            salary: null,
            share: false
        }
    },
    methods: {
        sortAsc(iteratee) {
            this.iteratee = iteratee;
            this.order = "asc";
        },
        sortDesc(iteratee) {
            this.iteratee = iteratee;
            this.order = "desc";
        },
        orderedItems(items) {
            return _.orderBy(items, this.iteratee, this.order);
        },
        saveEmployee() {
            this.items.push({
                name: this.newEmployee.name,
                position: this.newEmployee.position,
                age: this.newEmployee.age,
                office: this.newEmployee.office,
                salary: this.newEmployee.salary,
                share: this.newEmployee.share
            });
            this.newEmployee.name = null;
            this.newEmployee.position = null;
            this.newEmployee.age = null;
            this.newEmployee.office = null;
            this.newEmployee.salary = null;
            this.newEmployee.share = false;
        },
        setPages() {
            this.pages = [];
            let numberOfPages = Math.ceil(this.filteredItems.length / this.perPage);
            for (let index = 1; index <= numberOfPages; index++) {
                this.pages.push(index);
            }
        },
        paginate(items) {
            let page = this.page;
            let perPage = this.perPage;
            let from = page * perPage - perPage;
            let to = page * perPage;
            return items.slice(from, to);
        }
    },
    computed: {
        filteredItems() {
            var self = this;
            var items = this.items;

            if (this.iteratee) {
                items = this.orderedItems(items);
            }

            if (this.searchKeyword) {
                items = _.filter(items, function(item) {
                    return _.startsWith(item.name.toLowerCase(), self.searchKeyword.toLowerCase());
                });
            }

            return items;
        },
        displayedItems() {
            if (this.filteredItems) {
                return this.paginate(this.filteredItems);
            }
        },
        newEmployeeCoplete() {
            return (
                this.newEmployee.name != "" &&
                this.newEmployee.position != "" &&
                this.newEmployee.age > 0 &&
                this.newEmployee.office != "" &&
                this.newEmployee.salary > 0
            );
        }
    },
    watch: {
        filteredItems() {
            this.page = 1;
            this.setPages();
        }
    },
    mounted() {
        this.items = [
            { name: "Murtaz Ferguson", position: "Landscape Architect", office: "Amsterdam", age: "22", salary: "1450,03", shares: true },
            { name: "Helen Starrett", position: "Landscaper & Groundskeeper", office: "London", age: "25", salary: "1496,6", shares: false },
            { name: "Ida Spada", position: "Mathematician", office: "Brussels", age: "23", salary: "1426,43", shares: false },
            { name: "Bobbi Julien", position: "Logistician", office: "Antwerp", age: "21", salary: "1283,69", shares: true },
            { name: "Theokleia Schult", position: "Software Developer", office: "Paris", age: "28", salary: "2037,59", shares: true },
            { name: "Biddy Martins", position: "Art Director", office: "Ghent", age: "27", salary: "1923,8", shares: false },
            { name: "Fayza Böhmer", position: "Professional athlete", office: "Tokyo", age: "33", salary: "1621,6", shares: true },
            { name: "Beckah Leifsson", position: "Recreational Therapist", office: "New York", age: "38", salary: "1929,32", shares: true },
            { name: "Anniina Matevosyan", position: "Environmental scientist", office: "Lisbon", age: "34", salary: "2144,04", shares: true },
            { name: "Lan Mac Néill", position: "Teacher Assistant", office: "Madrid", age: "39", salary: "2399,66", shares: true },
            { name: "Aggie Janković", position: "Dentist", office: "Dubai", age: "45", salary: "1610,19", shares: false },
            { name: "Lucanus Stumpf", position: "Zoologist", office: "Doha", age: "30", salary: "2549,1", shares: false },
            { name: "Eudoxos O'Sullivan", position: "Auto Mechanic", office: "Jakarta", age: "31", salary: "1226,14", shares: false },
            { name: "Madeleine Myles", position: "Event Planner", office: "Riyadh", age: "32", salary: "2228,75", shares: false },
            { name: "Ji-Young Griffiths", position: "Computer Hardware Engineer", office: "Cairo", age: "23", salary: "2618,59", shares: false },
            { name: "Juno Jephson", position: "Customer Service Representative", office: "Casablanca", age: "28", salary: "2264,29", shares: false },
            { name: "Brahma Van Wieren", position: "Coach", office: "Antwerp", age: "28", salary: "1849,52", shares: true },
            { name: "Cyrillus Hofwegen", position: "Financial Advisor", office: "Paris", age: "41", salary: "2548,52", shares: true },
            { name: "Abd al-Latif Mehdi", position: "Telemarketer", office: "Ghent", age: "21", salary: "1467,47", shares: true },
            { name: "Palmiro Souček", position: "Human Resources Assistant", office: "Tokyo", age: "44", salary: "2685,04", shares: true },
            { name: "Saynab Van Wieren", position: "Economist", office: "New York", age: "35", salary: "2627,77", shares: false },
            { name: "Danne Iñíguez", position: "HR Specialist", office: "Lisbon", age: "36", salary: "2536,64", shares: true },
            { name: "Kazue Sovány", position: "Database administrator", office: "Tokyo", age: "40", salary: "2748,68", shares: true },
            { name: "Danel Silva", position: "Pharmacist", office: "New York", age: "44", salary: "1458,46", shares: true },
            { name: "Kadmos Bartolomei", position: "College Professor", office: "Lisbon", age: "46", salary: "2102,84", shares: false },
            { name: "Viola Del Río", position: "Carpenter", office: "Madrid", age: "47", salary: "1368,69", shares: false },
            { name: "Morgan Mac Pharlain", position: "Actuary", office: "Dubai", age: "51", salary: "1850,74", shares: false },
            { name: "Mijo Andrés", position: "IT Manager", office: "Doha", age: "33", salary: "1684,06", shares: false },
            { name: "Nina Marković", position: "Chef", office: "Riyadh", age: "36", salary: "1506,06", shares: false },
            { name: "Seve Lamon", position: "Desktop publisher", office: "Cairo", age: "37", salary: "1810,98", shares: false },
            { name: "Kyle Ulfsson", position: "Maintenance & Repair Worker", office: "Casablanca", age: "33", salary: "2682,83", shares: true },
            { name: "Breno McIver", position: "Physician", office: "Doha", age: "32", salary: "1344,81", shares: true },
            { name: "Belinda Vandroogenbroeck", position: "Surveyor", office: "Jakarta", age: "30", salary: "2904,65", shares: true },
            { name: "Alejandra Piazza", position: "Bookkeeping clerk", office: "Riyadh", age: "28", salary: "2234,1", shares: true },
            { name: "Clementius Ecclestone", position: "Clinical Laboratory Technician", office: "Cairo", age: "25", salary: "2981,9", shares: false },
            { name: "Gofraidh Hallman", position: "Real Estate Agent", office: "Casablanca", age: "22", salary: "2139,05", shares: false },
            { name: "Fergus Vinci", position: "Paralegal", office: "Antwerp", age: "21", salary: "1795,1", shares: false },
            { name: "Chidiebube Andres", position: "Musician", office: "Paris", age: "20", salary: "1346,89", shares: true },
            { name: "Vüsal Hannigen", position: "Diagnostic Medical Sonographer", office: "Ghent", age: "21", salary: "2806,23", shares: true },
            { name: "Aroldo Courtenay", position: "Janitor", office: "Tokyo", age: "28", salary: "1726,5", shares: false },
            { name: "Åse Vivas", position: "Public Relations Specialist", office: "New York", age: "27", salary: "1609,42", shares: true },
            { name: "Rómulo Aalmers", position: "Paramedic", office: "Ghent", age: "33", salary: "2779", shares: true },
            { name: "Primitiva Ridge", position: "Editor", office: "Tokyo", age: "38", salary: "2649,81", shares: true },
            { name: "Chryses Davis", position: "Loan Officer", office: "New York", age: "34", salary: "2575,67", shares: true },
            { name: "Zorica Niemi", position: "Recreation & Fitness Worker", office: "Lisbon", age: "39", salary: "1718,71", shares: true },
            { name: "Eszter Coburn", position: "Childcare worker", office: "Madrid", age: "45", salary: "1218,49", shares: true },
            { name: "Eldor Claasen", position: "Electrical Engineer", office: "Dubai", age: "30", salary: "1224,54", shares: true },
            { name: "Giuanna Buday", position: "Cashier", office: "Doha", age: "31", salary: "2151,89", shares: true },
            { name: "Henderson Atkinson", position: "Civil Engineer", office: "Doha", age: "32", salary: "2066,45", shares: false },
            { name: "Klimentina Hunter", position: "Budget analyst", office: "Jakarta", age: "22", salary: "1521,98", shares: true }
        ];
    }
});
