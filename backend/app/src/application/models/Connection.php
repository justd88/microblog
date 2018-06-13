<?php

class Connection extends AbstractModel {

    private $_from;
    private $_to;

    public function __construct($data = null) {
        $this->tableName = 'connections';
        parent::__construct();
        if ($data) {
            $this->mapFromDatabase($data);
        }
    }

    /**
     *
     * @param int $from
     * @param int $to
     * @return $this
     * @throws \Exception
     */
    public function loadByFromTo(int $from, int $to) {
        $data = $this->db->get_where('connections', ['from' => $from, 'to' => $to]);
        if ($data->num_rows() > 0) {
            $this->mapFromDatabase($data->row());
        } else {
            throw new \Exception("Connection not found");
        }
        return $this;
    }

    /**
     *
     * @return int
     */
    public function getFrom(): int {
        return $this->_from;
    }

    /**
     *
     * @return int
     */
    public function getTo(): int {
        return $this->_to;
    }

    /**
     *
     * @param int $from
     * @return $this
     */
    public function setFrom(int $from) {
        $this->_from = $from;
        return $this;
    }

    /**
     *
     * @param int $to
     * @return $this
     */
    public function setTo(int $to) {
        $this->_to = $to;
        return $this;
    }

    protected function mapToDatabase() {
        return [
            'from' => $this->_from,
            'to' => $this->_to
        ];
    }

    protected function mapFromDatabase($data) {
        $this->_from = $data->from;
        $this->_to = $data->to;
        $this->id = $data->id;
    }

    public function jsonSerialize() {
        return $this->mapToDatabase();
    }

    private function _isAlreadyExists() {
        return ($this->db->select('*')->from($this->tableName)->where('from', $this->_from)->where('to', $this->_to)->get()->num_rows() > 0);
    }

    public function save() {
        if ($this->_isAlreadyExists()) {
            throw new \Exception("Connection already Exists");
        }

        parent::save();
    }

}
