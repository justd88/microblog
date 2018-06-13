<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

abstract class AbstractModel extends CI_Model implements JsonSerializable {

    /**
     * Database Table Name
     * @var string
     */
    protected $tableName = "";

    /**
     * Entity Id
     * @var int
     */
    protected $id;

    /**
     * Check the model is populated
     * @return bool
     */
    private function _isLoaded() {
        return (bool) $this->id;
    }

    public function getId() {
        return $this->id;
    }

    public function load(int $id) {
        if (!$this->id) {
            $data = $this->db->get_where($this->tableName, array('id =' => $id))->row();
            if ($data) {
                $this->id = $data->id;
                $this->mapFromDatabase($data);
            } else {
                return NULL;
            }
        }
        return $this;
    }

    public function save() {
        if (!$this->_isLoaded()) {
            $this->createNew();
        } else {
            $this->update();
        }
        return $this;
    }

    /**
     * Create a new record in the database
     */
    protected function createNew() {
        $this->db->insert($this->tableName, $this->mapToDatabase());
        $this->id = $this->db->insert_id();
    }

    /**
     * Update Record in database
     */
    protected function update() {
        if ($this->_isLoaded()) {
            $this->db->where('id', $this->id);
            $this->db->update($this->tableName, $this->mapToDatabase());
        } else {
            throw new Exception("Model is not loaded");
        }
    }

    abstract protected function mapFromDatabase($data);

    abstract protected function mapToDatabase();

    abstract public function jsonSerialize();

    public function delete() {
        if ($this->_isLoaded()) {
            $this->db->delete($this->tableName, array('id' => $this->id));
        } else {
            throw new Exception("Model is not loaded");
        }
    }

}
