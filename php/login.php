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

// Set query
$query ="SELECT `users`.`id`,
								`users`.`type`,
								`type`.`name` AS `type_name`,
								`users`.`name`,
								`users`.`born`,
								`users`.`gender`,
								`users`.`address`,
								`users`.`country_code`,
								`users`.`phone`,
								`users`.`password`,
								`users`.`valid`
					 FROM `users`
		 INNER JOIN `type`
						 ON `type`.`id` = `users`.`type` AND
						 		`type`.`type` = 'USER'
					WHERE `users`.`email` = ?
					LIMIT 1;";

// Execute query
$result = $db->execute($query, array($args['email']));

// Close connection
$db = null;

// Check not found
if (is_null($result)) {

	// Set error
	Util::setError("Az email cím helytelen!\nKérjük, próbálja újra!");
}

// Simplifies result
$result = $result[0];

// Check user valid
if (!$result['valid']) {

	// Set error
	Util::setError("A felhasználó le van tiltva!");
}

// Check password
if ($result['password'] !== $args['password']) {

	// Set error
	Util::setError("A jelszó helytelen!\nKérjük, próbálja újra!");
}

// Unset not necessary keys
unset($result['password'], $result['valid']);

// Set response
Util::setResponse($result);



