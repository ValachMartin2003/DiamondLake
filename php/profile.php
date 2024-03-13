<?php
declare(strict_types=1);

// Using namespaces aliasing
use Util\Util as Util;
use Database\Database as Database;

// Set environment
require_once('../../common/php/environment.php');

// Get arguments
$args = Util::getArgs();

// Connect to database
$db = new Database();

// Set parameters, and query
$query 	= "UPDATE `users` SET ";
foreach(array_keys($args) as $key) {
	if ($key !== 'id') $query .= ("`".$key."` = :".$key.",");
}

// Finalize query
$query = mb_substr($query, 0, -1, 'utf-8') . " WHERE `id` = :id";

// Execute query
$result = $db->execute($query, $args);

// Close connection
$db = null;

// Check not success
if (!$result['affectedRows']) {

	// Set error
	Util::setError('Az adatmódosítás nem sikerült!');
}

// Set response
Util::setResponse(null);