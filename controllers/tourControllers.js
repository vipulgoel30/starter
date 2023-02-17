const fs = require('fs');

const tourFileDirectory = `${__dirname}/../dev-data/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(tourFileDirectory, 'utf-8'));

const checkId = (req, res, next, val) => {
    if (val < 0 || val >= tours.length) {
        res
            .status(400)
            .json({ status: 'fail', message: 'Please enter the valid tour ID' });
    } else next();
};

const getAllTours = (req, res) => {
    res.status(200).json({
        status: 'success',
        records: tours.length,
        data: { tours },
    });
};

const createTour = (req, res) => {
    const tour = { id: tours.length, ...req.body };
    tours.push(tour);
    fs.writeFile(tourFileDirectory, JSON.stringify(tours), 'utf-8', (err) => {
        if (err)
            res.status(404).json({ status: 'fail', message: 'Unable to add tour' });
        else
            res
                .status(201)
                .json({ status: 'success', records: tours.length, data: { tours } });
    });
};

const getTour = (req, res) => {
    const id = +req.params.id;
    const tour = tours[id];
    res.status(200).json({ status: 'success', data: { tour } });
};

const updateTour = (req, res) => {
    const id = +req.params.id;
    tours[id] = { ...tours[id], ...req.body };
    fs.writeFile(tourFileDirectory, JSON.stringify(tours), 'utf-8', (err) => {
        if (err)
            res
                .status(404)
                .json({ status: 'fail', message: 'Unable to update tour' });
        else
            res
                .status(200)
                .json({ status: 'success', records: tours.length, data: { tours } });
    });
};

const deleteTour = (req, res) => {
    const id = +req.params.id;
    tours.splice(id, 1);
    fs.writeFile(
        tourFileDirectory,
        JSON.stringify(tours),
        'utf-8',
        (err) => {
            if (err)
                res
                    .status(404)
                    .json({ status: 'fail', message: 'Unable to delete the tour' });
            else
                res
                    .status(204)
                    .json({
                        status: 'success',
                        records: tours.length,
                        data: { tours },
                    });
        }
    );
};

module.exports = {
    getAllTours,
    createTour,
    getTour,
    updateTour,
    deleteTour,
    checkId,
};
