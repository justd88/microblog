<?php

require_once 'AbstractModel.php';

class Post extends AbstractModel {

    private $_content;
    private $_authorId;
    private $_createdAt;
    private $_authorName;

    public function __construct($data = null) {
        parent::__construct();
        $this->tableName = 'posts';
        if ($data) {
            $this->mapFromDatabase($data);
        }
    }

    /**
     * set Author Name
     * @param string $authorName
     * @return $this
     */
    public function setAuthorName(string $authorName) {
        $this->_authorName = $authorName;
        return $this;
    }

    /**
     * Get Author Name
     * @param string $authorName
     * @return $this
     */
    public function getAuthorName(string $authorName) {
        return $this->_authorName;
    }

    /**
     * set Content
     * @param string $content
     * @return $this
     */
    public function setContent(string $content) {
        $this->_content = $content;
        return $this;
    }

    /**
     * get Content
     * @return string
     */
    public function getContent(): string {
        return $this->_content;
    }

    /**
     * set AuthorId
     * @param int $authorId
     * @return $this
     */
    public function setAuthorId(int $authorId) {
        $this->_authorId = $authorId;
        return $this;
    }

    /**
     * get AuthorId
     * @return int
     */
    public function getAuthorId(): int {
        return $this->_authorId;
    }

    /**
     * get Created At
     * @return string
     */
    public function getCreatedAt(): string {
        return $this->_createdAt;
    }

    /**
     * set Created At
     * @param type $createdAt
     * @return $this
     */
    public function setCreatedAt($createdAt) {
        $this->_createdAt = $createdAt;
        return $this;
    }

    protected function mapToDatabase() {
        return[
            'content' => $this->_content,
            'author_id' => $this->_authorId,
            'created_at' => $this->_createdAt,
        ];
    }

    protected function mapFromDatabase($data) {

        $this->_content = $data->content;
        $this->_authorId = $data->author_id;
        $this->_createdAt = $data->created_at;
        $this->id = $data->id;
        if (property_exists($data, 'author_name')) {
            $this->_authorName = $data->author_name;
        }
    }

    public function jsonSerialize() {
        $jsonArray = $this->mapToDatabase();
        $jsonArray['author_name'] = $this->_authorName;
        $jsonArray['id'] = $this->id;
        return $jsonArray;
    }

}
